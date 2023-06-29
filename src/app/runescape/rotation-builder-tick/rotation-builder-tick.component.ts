import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tick } from '../Interactions';

@Component({
  selector: 'app-rotation-builder-tick',
  templateUrl: './rotation-builder-tick.component.html',
  styleUrls: ['./rotation-builder-tick.component.scss']
})
export class RotationBuilderTickComponent implements OnInit {

  @Input()
  tick!: Tick;

  @Output()
  onEdit = new EventEmitter<Tick>();

  @Output()
  onDelete = new EventEmitter<Tick>();

  constructor() { }

  ngOnInit(): void {
  }

}
