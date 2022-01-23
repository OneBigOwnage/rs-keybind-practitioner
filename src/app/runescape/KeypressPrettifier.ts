import { Injectable } from "@angular/core";
import { RunescapeModule } from "./runescape.module";


@Injectable({ providedIn: RunescapeModule })
export default class KeypressPrettifier {

  extractKey(event: KeyboardEvent): string {
    return this.modifierKeys(event)
      + this.actualKey(event);
  }

  modifierKeys(event: KeyboardEvent) {
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

  actualKey(event: KeyboardEvent) {
    return event.key.toUpperCase();
  }
}
