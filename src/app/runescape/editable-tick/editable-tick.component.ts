import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tick } from '../Tick';

@Component({
  selector: 'app-editable-tick',
  templateUrl: './editable-tick.component.html',
  styleUrls: ['./editable-tick.component.scss']
})
export class EditableTickComponent implements OnInit {

  @Input()
  tick?: Tick;

  @Output()
  onChange = new EventEmitter<Tick>();

  @Output()
  onDelete = new EventEmitter<Tick>();

  newKeyStroke = '';

  editingKeyStroke = '';

  editingKeyStrokeIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    if (this.newKeyStroke.trim() === '') {
      return;
    }

    this.tick?.keyPresses.push(this.newKeyStroke.trim().toUpperCase());
    this.newKeyStroke = '';

    this.onChange.emit(this.tick);
  }

  onRemove(index: number) {
    this.tick?.keyPresses.splice(index, 1);

    this.onChange.emit(this.tick);
  }

  startEditing(key: string, index: number) {
    this.editingKeyStroke = key;
    this.editingKeyStrokeIndex = index;
  }

  stopEditing() {
    if (this.editingKeyStroke.trim() !== '') {
      this.tick!.keyPresses[this.editingKeyStrokeIndex] = this.editingKeyStroke.trim().toUpperCase();

      this.onChange.emit(this.tick);
    }

    this.editingKeyStroke = '';
    this.editingKeyStrokeIndex = -1;
  }
}
