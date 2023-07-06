import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeybindRepository, keybindFactory } from '../keybind-repository.service';
import { InputHandler } from '../InputHandler.service';

import { RunescapeAction, RunescapeActions } from '../RunescapeActions';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RotationRepository } from '../rotation-repository.service';
import TickRepository from '../TickRepository.service';

@Component({
  selector: 'app-keybind-configurator',
  templateUrl: './keybind-configurator.component.html',
  styleUrls: ['./keybind-configurator.component.scss']
})
export class KeybindConfiguratorComponent implements OnInit, OnDestroy {
  public actions = RunescapeActions;

  protected actionTarget: RunescapeAction | undefined;

  constructor(public repo: KeybindRepository, public input: InputHandler, public tickRepo: TickRepository) {
    input.keyPresses$().subscribe(event => {
      if (this.actionTarget) {
        this.repo.storeOrUpdate(keybindFactory(event.key, this.actionTarget));
        this.clearActionTarget();
      }
    });
  }

  public ngOnInit(): void {
    this.input.startCapturing();
  }

  public ngOnDestroy(): void {
    this.input.stopCapturing();
  }

  public setActionTarget(action: RunescapeAction) {
    this.actionTarget = action;
  }

  public clearActionTarget() {
    (document.activeElement as HTMLElement)?.blur();
    this.actionTarget = undefined;
  }

  public getKeybindForAction$(action: RunescapeAction): Observable<string> {
    return this.repo.keybinds$().pipe(map(keybinds => keybinds.find(keybind => keybind.ability.name === action)?.keyCombination || ''));
  }

  public clearKeybindForAction(action: RunescapeAction) {
    this.repo.delete(keybindFactory('', action));
  }

  public isUsedInCurrentRotation$(action: RunescapeAction): Observable<boolean> {
    return this.tickRepo.rotation$().pipe(map(rotation => rotation.ticks.some(tick => tick.actions.some(tickAction => tickAction.name === action))));
  }
}
