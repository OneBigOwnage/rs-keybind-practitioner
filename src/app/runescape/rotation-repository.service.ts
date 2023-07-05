import { Injectable } from '@angular/core';
import { PlannedTick, PlannedTickWithKeybind, tickFactory } from './Interactions';
import { RunescapeAction } from './RunescapeActions';
import { Ability, Keybind, KeybindRepository } from './keybind-repository.service';
import { BehaviorSubject } from 'rxjs';

export class AbilityRotation {
  constructor(public readonly ID: string, public name: string, public ticks: PlannedTick[]) { }

  public withKeybinds(keybinds: Keybind[]): AbilityRotationWithKeybinds {
    return new AbilityRotationWithKeybinds(
      this.ID,
      this.name,
      this.ticks.map(tick => tick.withKeybinds(keybinds))
    );
  }
};

export class AbilityRotationWithKeybinds extends AbilityRotation {
  constructor(public readonly ID: string, public name: string, public ticks: PlannedTickWithKeybind[]) {
    super(ID, name, ticks);
  }
};

type plainObjectRotation = { ID: string, name: string, ticks: { actions: { name: RunescapeAction }[] }[] };

@Injectable({
  providedIn: 'root'
})
export class RotationRepository {
  protected rotations: BehaviorSubject<AbilityRotation[]> = new BehaviorSubject<AbilityRotation[]>([]);

  constructor(public keybinds: KeybindRepository) {
    this.rotations.next(this.importRotationsFromLocalStorage());
    this.rotations.subscribe(value => this.persistToLocalStorage(value));

    (window as any).seed = () => this.seed();
  }

  protected importRotationsFromLocalStorage(): AbilityRotation[] {
    let plainObjects = JSON.parse(localStorage.getItem('rotations') || JSON.stringify([])) as plainObjectRotation[]

    return plainObjects.map((plainObject) => {
      return new AbilityRotation(
        plainObject.ID,
        plainObject.name,
        plainObject.ticks.map(tick => {
          return new PlannedTick(
            tick.actions.map(action => new Ability(action.name))
          );
        })
      );
    });
  }

  protected persistToLocalStorage(rotations: AbilityRotation[]): void {
    localStorage.setItem('rotations', JSON.stringify(rotations));
  }

  public rotations$() {
    return this.rotations.asObservable();
  }

  public addRotation(rotation: AbilityRotation): void {
    this.rotations.next([...this.rotations.value, rotation]);
  }

  public removeRotation(rotation: AbilityRotation): void {
    this.rotations.next(this.rotations.value.filter((r) => r.ID !== rotation.ID));
  }

  public updateRotation(rotation: AbilityRotation): void {
    this.rotations.next(this.rotations.value.map((r) => r.ID === rotation.ID ? rotation : r));
  }

  public seed(): void {
    this.addRotation(new AbilityRotation('AAAAA', 'Telos p1',
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
      ])
    ));
  }
}
