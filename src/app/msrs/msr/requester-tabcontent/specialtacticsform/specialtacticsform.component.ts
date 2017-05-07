import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-specialtacticsform',
  templateUrl: './specialtacticsform.component.html',
  styles: []
})
export class SpecialtacticsformComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

}
