import { Component } from '@angular/core';
import { KeybindRepository, keybindFactory } from '../keybind-repository.service';
import { InputHandler } from '../InputHandler.service';

import { RunescapeAction, RunescapeActions } from '../RunescapeActions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keybind-configurator',
  templateUrl: './keybind-configurator.component.html',
  styleUrls: ['./keybind-configurator.component.scss']
})
export class KeybindConfiguratorComponent {
  public actions = RunescapeActions;

  protected actionTarget: RunescapeAction | undefined;

  constructor(public repo: KeybindRepository, public input: InputHandler) {
    input.keyPresses$().subscribe(event => {
      if (this.actionTarget) {
        this.repo.storeOrUpdate(keybindFactory(event.key, this.actionTarget));
        this.clearActionTarget();
      }
    });
  }

  public setActionTarget(action: RunescapeAction) {
    this.actionTarget = action;
  }

  public clearActionTarget() {
    (document.activeElement as HTMLElement)?.blur();
    this.actionTarget = undefined;
  }

  public getKeybindForAction$(action: string): Observable<string> {
    return this.repo.keybinds$().pipe(map(keybinds => keybinds.find(keybind => keybind.ability.name === action)?.keyCombination || ''));
  }

  public clearKeybindForAction(action: RunescapeAction) {
    this.repo.delete(keybindFactory('', action));
  }
}
