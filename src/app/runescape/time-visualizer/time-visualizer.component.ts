import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-visualizer',
  templateUrl: './time-visualizer.component.html',
  styleUrls: ['./time-visualizer.component.scss']
})
export class TimeVisualizerComponent implements OnInit {

  @Input()
  value: number = 50;

  radius: number = 50;
  circumference: number = Math.PI * this.radius * 2;

  constructor() { }

  ngOnInit(): void {
  }

  length() {
    this.radius = 50;
    this.circumference = Math.PI * this.radius * 2;

		return ((100 - this.value) / 100) * this.circumference;
  }
}
