import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Msr, MsrTrackedChanges, MsrChangeReport } from '../shared/msr.model';
import { EntityService } from '../../core/entity.service';
import { NewsfeedItem, StatusChange } from '../../msrs/shared/newsfeed.model';
import { MsrService } from '../shared/msr.service';
import { NewsfeedService } from '../shared/newsfeed.service';
import { MsrRouteData } from '../shared/msr-resolver.service';
import { NotificationsService } from 'angular2-notifications';
import { MissionService } from '../../core/mission.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styles: []
})
export class MsrComponent implements OnInit {
  msrOnLoad: Msr;
  msrBeingEdited: Msr;
  cachedData: any;
  tabPermissions: any;
  isLinkedWithMission = false;
  getMatchingMissions = this.missionService.search;
  cardViewModel = this.missionService.getCardViewModel();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private notificationService: NotificationsService,
    private newsfeedService: NewsfeedService,
    private msrService: MsrService,
    private missionService: MissionService) { }

  ngOnInit() {
    this.listenForRouteData();
  }

  capturePristineMsr(msr: Msr) {
    if (msr) {
      this.msrOnLoad = msr;
      this.msrBeingEdited = this.entityService.clone<Msr>(Msr, msr);
      this.tabPermissions = TabPermissionsLogic.refresh(this.msrOnLoad, this.cachedData.currentUser,
        this.cachedData.owningUnits);
    }
  }

  hasLinkedMission() {
    return !!this.msrBeingEdited.Id || this.isLinkedWithMission;
  }

  nextButtonClicked() {
    this.isLinkedWithMission = true;
  }

  listenForRouteData() {
    this.route.data.subscribe((resolved: {data: MsrRouteData}) => {
      this.cachedData = resolved.data.lookups;
      this.capturePristineMsr(resolved.data.msr);
    });
  }

  onMissionAdded(msn) {
    this.msrBeingEdited.RelatedMissionId = String(msn.Id);
  }

  saveMsr() {
    const changes = MsrTrackedChanges.compare(this.msrOnLoad, this.msrBeingEdited);

    if (!this.msrBeingEdited.Id) {
      this.msrService.create(this.msrBeingEdited, this.tabPermissions)
        .then((createdItem: any) => this.createNewsfeedItems(changes, createdItem.Id))
        .then((newsfeedItems) => this.router.navigate(['/msrs']));
    } else {
      this.msrService.update(this.msrBeingEdited, this.tabPermissions)
        .then(() => this.createNewsfeedItems(changes, this.msrBeingEdited.Id))
        .then((newsfeedItems) => {
          this.capturePristineMsr(this.msrBeingEdited);
          this.msrBeingEdited.NewsfeedItems.push(...newsfeedItems);
          this.notificationService.success('Confirmation', 'Your changes were saved');
        });
    }

  }

  createNewsfeedItems(changeReport: MsrChangeReport, msrID: number) {
    return this.newsfeedService.createFromChangeReport(changeReport, msrID);
  }
}

class TabPermissionsLogic {
  private static isCurrentUserMemberOfOwningUnit(currentUser, owningUnits) {
    return !!_.intersection(currentUser.owningUnits, _.map(owningUnits, 'Id')).length;
  }
  private static isCurrentUserMemberOfAssignedSupportUnit(currentUser, msr) {
    return _.includes(currentUser.supportUnits, msr.SupportUnitId);
  }
  static refresh(msr, currentUser, owningUnits) {
    return  {
      'JSOAC/JMOC': !!msr.Id && TabPermissionsLogic.isCurrentUserMemberOfOwningUnit(currentUser, owningUnits),
      'Support Unit': !!msr.Id && !!msr.SupportUnitId && TabPermissionsLogic.isCurrentUserMemberOfAssignedSupportUnit(currentUser, msr),
      'Status': !!msr.Id
    };
  }
}
