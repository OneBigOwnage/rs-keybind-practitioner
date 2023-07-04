import { Injectable } from '@angular/core';
import { PlannedTick, ShouldPerformAction } from './Interactions';
import { RunescapeAction } from './RunescapeActions';
import { Ability, Keybind } from './keybind-repository.service';
import { BehaviorSubject } from 'rxjs';

export class Rotation {
  constructor(public name: string, public ticks: PlannedTick[]) { }
};

type plainObjectRotation = { name: string, ticks: { interactions: { keybind: { keyCombination: string, ability: { name: RunescapeAction } } }[] }[] };

@Injectable({
  providedIn: 'root'
})
export class RotationRepository {
  protected rotations: BehaviorSubject<Rotation[]> = new BehaviorSubject<Rotation[]>([]);

  constructor() {
    this.rotations.next(this.importRotationsFromLocalStorage());
    this.rotations.subscribe(value => this.persistToLocalStorage(value));
  }

  public importRotationsFromLocalStorage(): Rotation[] {
    let plainObjects = JSON.parse(localStorage.getItem('rotations') || JSON.stringify([])) as plainObjectRotation[]

    return plainObjects.map((plainObject) => {
      return new Rotation(
        plainObject.name,
        plainObject.ticks.map((tick) => {
          return new PlannedTick(
            tick.interactions.map((interaction) => {
              return new ShouldPerformAction(
                new Keybind(
                  interaction.keybind.keyCombination,
                  new Ability(interaction.keybind.ability.name)
                )
              );
            })
          );
        })
      );
    });
  }

  public persistToLocalStorage(rotations: Rotation[]): void {
    localStorage.setItem('rotations', JSON.stringify(rotations));
  }

}
