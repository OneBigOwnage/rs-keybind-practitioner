import { Component, Input, OnInit } from '@angular/core';
import { PlannedTick } from '../PlannedTick';

@Component({
  selector: 'app-planned-tick',
  templateUrl: './planned-tick.component.html',
  styleUrls: ['./planned-tick.component.scss']
})
export class PlannedTickComponent implements OnInit {

  @Input()
  tick?: PlannedTick;

  constructor() { }

  ngOnInit(): void {
  }

}
