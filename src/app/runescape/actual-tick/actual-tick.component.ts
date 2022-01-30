import { Component, Input, OnInit } from '@angular/core';
import ResultSet from '../ResultSet';
import { Tick } from '../Tick';

@Component({
  selector: 'app-actual-tick',
  templateUrl: './actual-tick.component.html',
  styleUrls: ['./actual-tick.component.scss']
})
export class ActualTickComponent implements OnInit {

  @Input()
  tick?: Tick;

  @Input()
  resultset?: ResultSet;

  constructor() { }

  ngOnInit(): void {
  }

}
