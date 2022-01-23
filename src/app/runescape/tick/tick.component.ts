import { Component, Input, OnInit } from '@angular/core';
import { Tick } from '../Tick';

@Component({
  selector: 'app-tick',
  templateUrl: './tick.component.html',
  styleUrls: ['./tick.component.scss']
})
export class TickComponent implements OnInit {

  @Input()
  tick?: Tick;

  constructor() { }

  ngOnInit(): void {
  }

}
