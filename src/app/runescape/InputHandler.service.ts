import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class KeyPress {
  constructor(public readonly key: string) { }
}

export type UserInput = KeyPress;

@Injectable({
  providedIn: 'root'
})
export class InputHandler {

  protected keyPresses = new Subject<KeyPress>();

  constructor() {
    this.registerListeners();
  }

  public keyPresses$(): Observable<KeyPress> {
    return this.keyPresses.asObservable();
  }

  protected registerListeners() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!this.shouldRecordKeystroke(event)) {
        return;
      }

      this.keyPresses.next(this.extractKey(event));
    });
  }

  protected extractKey(event: KeyboardEvent): KeyPress {
    let key = this.mapSpecialKeys(
      this.modifierKeys(event) + this.actualKey(event)
    );

    return new KeyPress(key);
  }

  protected modifierKeys(event: KeyboardEvent): string {
    let mod = '';

    if (event.ctrlKey) {
      mod += 'CTRL-';
    }

    if (event.altKey) {
      mod += 'ALT-';
    }

    if (event.shiftKey) {
      mod += 'SHIFT-';
    }

    return mod;
  }

  protected actualKey(event: KeyboardEvent): string {
    return event.key.toUpperCase();
  }

  protected shouldRecordKeystroke(event: KeyboardEvent): boolean {
    return !['CTRL', 'ALT', 'SHIFT'].includes(event.key.toUpperCase());
  }

  protected mapSpecialKeys(key: string) {
    if (key === ' ') {
      return '<SPACE>';
    }

    return key;
  }
}
