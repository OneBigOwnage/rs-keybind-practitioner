import { Injectable } from "@angular/core";
import { fromEvent, interval, merge, Observable, zip } from "rxjs";
import { buffer, filter, map, tap } from 'rxjs/operators';
import { Tick } from "../runescape/Tick";

@Injectable({ providedIn: 'root' })
export class TickService {

  protected tickNr!: number;

  protected ticksOnly$!: Observable<number>;
  protected keysDown$!: Observable<string>;
  ticks$!: Observable<Tick>;

  init() {
    this.keysDown$ = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(event => !this.isRequestingDevtoolsOrReload(event)),
        filter(event => !this.isModifierKey(event)),
        tap(event => {
          event.preventDefault();
          event.stopPropagation();
        }),
        map(event => this.mapper(event)),
      );

    this.ticksOnly$ = interval(600)
      .pipe(
        tap(nr => this.tickNr = nr)
      );

    this.ticks$ = this.keysDown$
      .pipe(
        buffer(this.ticksOnly$),
        map((keysInTick) => {
          return new Tick(this.tickNr, keysInTick, []);
        })
      );
  }

  mapper(event: KeyboardEvent): string {
    let modifierKeys = '';

    if (event.ctrlKey) {
      modifierKeys += 'CTRL-'
    }

    if (event.altKey) {
      modifierKeys += 'ALT-'
    }

    if (event.shiftKey) {
      modifierKeys += 'SHIFT-'
    }

    return modifierKeys + event.key.toUpperCase();
  }

  protected isRequestingDevtoolsOrReload(event: KeyboardEvent): boolean {
    return (event.ctrlKey && event.key.toLowerCase() === 'r')
      || (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i');
  }

  protected isModifierKey(event: KeyboardEvent): boolean {
    return ['Control', 'Alt', 'Shift'].includes(event.key);
  }
}
