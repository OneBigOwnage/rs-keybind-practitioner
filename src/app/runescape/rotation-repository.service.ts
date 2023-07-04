import { Injectable } from '@angular/core';
import { PlannedTick, ShouldPerformAction, tickFactory } from './Interactions';
import { RunescapeAction } from './RunescapeActions';
import { Ability, Keybind, KeybindRepository } from './keybind-repository.service';
import { BehaviorSubject } from 'rxjs';

export class Rotation {
  constructor(public readonly ID: string, public name: string, public ticks: PlannedTick[]) { }
};

type plainObjectRotation = { ID: string, name: string, ticks: { interactions: { keybind: { keyCombination: string, ability: { name: RunescapeAction } } }[] }[] };

@Injectable({
  providedIn: 'root'
})
export class RotationRepository {
  protected rotations: BehaviorSubject<Rotation[]> = new BehaviorSubject<Rotation[]>([]);

  constructor(public keybinds: KeybindRepository) {
    this.rotations.next(this.importRotationsFromLocalStorage());
    this.rotations.subscribe(value => this.persistToLocalStorage(value));

    (window as any).seed = () => this.seed();
  }

  protected importRotationsFromLocalStorage(): Rotation[] {
    let plainObjects = JSON.parse(localStorage.getItem('rotations') || JSON.stringify([])) as plainObjectRotation[]

    return plainObjects.map((plainObject) => {
      return new Rotation(
        plainObject.ID,
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

  protected persistToLocalStorage(rotations: Rotation[]): void {
    localStorage.setItem('rotations', JSON.stringify(rotations));
  }

  public rotations$() {
    return this.rotations.asObservable();
  }

  public addRotation(rotation: Rotation): void {
    this.rotations.next([...this.rotations.value, rotation]);
  }

  public removeRotation(rotation: Rotation): void {
    this.rotations.next(this.rotations.value.filter((r) => r.ID !== rotation.ID));
  }

  public updateRotation(rotation: Rotation): void {
    this.rotations.next(this.rotations.value.map((r) => r.ID === rotation.ID ? rotation : r));
  }

  public seed(): void {
    this.keybinds.keybinds$().subscribe(keybinds => {
      this.addRotation(new Rotation('AAAAA', 'Telos p1',
        tickFactory([
          ['Target cycle', 'Greater Sunshine', 'Inquisitor staff'],
          [],
          [],
          ['Blood Blitz', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
          [],
          [],
          ['Masterwork Spear of Annihilation', 'Ingenuity of the Humans', 'Essence of Finality spec', 'Inquisitor staff'],
          [],
          [],
          ['Combust', 'Wand of the praesul', 'Imperium core'],
          [],
          [],
          ['Smoke Cloud', 'Freedom', 'Inquisitor staff'],
          [],
          [],
          ['Ice Barrage', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
          [],
          [],
          ['Inquisitor staff', 'Dragon Breath'],
          [],
          [],
          ['Ice Barrage', 'Wild Magic'],
          [],
          [],
          ['Wrack'],
          [],
          [],
          ['Blood Blitz', 'Wand of the praesul', 'Imperium core', 'Greater Concentrated Blast'],
          [],
          [],
          ['Inquisitor staff', 'Omnipower'],
          [],
          [],
          ['Tsunami'],
          [],
          ['Dive'],
          ['Dragon Breath']
        ], keybinds)
      ));
    });
  }
}
