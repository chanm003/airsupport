import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Msr, MsrTrackedChanges, MsrChangeReport } from '../shared/msr.model';
import { EntityService } from '../../core/entity.service';
import { NewsfeedItem, StatusChange } from '../../msrs/shared/newsfeed.model';
import { MsrService } from '../shared/msr.service';
import { NewsfeedService } from '../shared/newsfeed.service';
import { EmailnotificationService } from '../shared/emailnotification.service';
import { MsrRouteData } from '../shared/msr-resolver.service';
import { NotificationsService } from 'angular2-notifications';
import { MissionService } from '../../core/mission.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
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
    private missionService: MissionService,
    private emailnotificationService: EmailnotificationService,
    private spinnerService: SpinnerService) { }

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

    this.route
      .queryParams
      .subscribe(params => {
        if (!this.msrBeingEdited.Id) {
          const msn = this.missionService.extractSelectedMissionFromQueryString(params);
          if (msn) {
            this.missionService.parseMissionTitle(msn);
            this.msrBeingEdited.SelectedMissions = [msn];
            this.msrBeingEdited.RelatedMissionId = String(msn.Id);
            this.isLinkedWithMission = true;
          }
        }
      });
  }

  onMissionAdded(msn) {
    this.missionService.parseMissionTitle(msn);
    this.msrBeingEdited.RelatedMissionId = String(msn.Id);
  }

  saveMsr() {
    const changes = MsrTrackedChanges.compare(this.msrOnLoad, this.msrBeingEdited);

    this.spinnerService.show();
    if (!this.msrBeingEdited.Id) {
      this.msrService.create(this.msrBeingEdited, this.tabPermissions)
        .then((createdItem: any) => {
          this.msrBeingEdited.Id = createdItem.Id;
          this.createNewsfeedItems(changes, this.msrBeingEdited);
        })
        .then((newsfeedItems) => {
          this.spinnerService.hide();
          this.router.navigate(['/msrs']);
          this.emailnotificationService.createFromChangeReport(changes, this.msrBeingEdited);
        });
    } else {
      this.msrService.update(this.msrBeingEdited, this.tabPermissions)
        .then(() => this.createNewsfeedItems(changes, this.msrBeingEdited))
        .then((newsfeedItems) => {
          this.capturePristineMsr(this.msrBeingEdited);
          this.msrBeingEdited.NewsfeedItems.push(...newsfeedItems);
          this.spinnerService.hide();
          this.notificationService.success('Confirmation', 'Your changes were saved');
          this.emailnotificationService.createFromChangeReport(changes, this.msrBeingEdited);
        });
    }

  }

  createNewsfeedItems(changeReport: MsrChangeReport, msr: Msr) {
    return this.newsfeedService.createFromChangeReport(changeReport, msr);
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
