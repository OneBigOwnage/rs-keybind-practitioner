import { Component, Input, OnInit } from '@angular/core';
import { ActualTick } from '../ActualTick';
import ResultSet from '../ResultSet';

@Component({
  selector: 'app-actual-tick',
  templateUrl: './actual-tick.component.html',
  styleUrls: ['./actual-tick.component.scss']
})
export class ActualTickComponent implements OnInit {

  @Input()
  tick?: ActualTick;

  @Input()
  resultset?: ResultSet;

  constructor() { }

  ngOnInit(): void {
  }

}
