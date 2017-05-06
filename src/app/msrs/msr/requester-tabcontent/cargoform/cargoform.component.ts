import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-cargoform',
  templateUrl: './cargoform.component.html',
  styles: []
})
export class CargoformComponent implements OnInit {
  @Input() msr: Msr;
  
  constructor() { }

  ngOnInit() {
    
  }

}
