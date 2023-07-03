import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RunescapeAction } from './RunescapeActions';

export class Keybind {
  constructor(public readonly keyCombination: string, public readonly ability: Ability) { }
};

export class Ability {
  constructor(public readonly name: RunescapeAction) { }

  public iconURL(): string {
    return `/assets/Runescape ability icons/${this.name.split(' ').join('_')}.png`;
  }
};

export const keybindFactory = (keyCombination: string, ability: RunescapeAction) => new Keybind(keyCombination, new Ability(ability));

@Injectable({
  providedIn: 'root'
})
export class KeybindRepository {

  protected keybinds: BehaviorSubject<Keybind[]>;

  constructor() {
    this.keybinds = new BehaviorSubject<Keybind[]>(
      this.importKeybindsFromLocalStorage()
    );

    this.keybinds.subscribe(value => localStorage.setItem('keybinds', JSON.stringify(value)));

    (window as any).seed = () => this.seed();
  }

  public keybinds$(): Observable<Keybind[]> {
    return this.keybinds.asObservable();
  }

  public storeOrUpdate(keybind: Keybind): void {
    let keybinds = this.keybinds.value;
    let index = keybinds.findIndex(k => k.ability.name === keybind.ability.name);

    if (index >= 0) {
      keybinds[index] = keybind;
    } else {
      keybinds.push(keybind);
    }

    this.keybinds.next(keybinds);
  }

  public delete(keybind: Keybind): void {
    let keybinds = this.keybinds.value;
    let index = keybinds.findIndex(k => k.ability.name === keybind.ability.name);

    if (index >= 0) {
      keybinds.splice(index, 1);
    }

    this.keybinds.next(keybinds);
  }

  public seed(): void {
    // Matching keybinds for the telos p1 rotation
    this.storeOrUpdate(keybindFactory("CTRL-E", "Greater Sunshine"));
    this.storeOrUpdate(keybindFactory("B", "Target cycle"));
    this.storeOrUpdate(keybindFactory("A", "Inquisitor staff"));
    this.storeOrUpdate(keybindFactory("1", "Blood Blitz"));
    this.storeOrUpdate(keybindFactory("S", "Wand of the praesul"));
    this.storeOrUpdate(keybindFactory("D", "Imperium core"));
    this.storeOrUpdate(keybindFactory("T", "Greater Concentrated Blast"));
    this.storeOrUpdate(keybindFactory("ALT-3", "Masterwork Spear of Annihilation"));
    this.storeOrUpdate(keybindFactory("ALT-B", "Ingenuity of the Humans"));
    this.storeOrUpdate(keybindFactory("X", "Essence of Finality spec"));
    this.storeOrUpdate(keybindFactory("V", "Combust"));
    this.storeOrUpdate(keybindFactory("H", "Smoke Cloud"));
    this.storeOrUpdate(keybindFactory("Z", "Freedom"));
    this.storeOrUpdate(keybindFactory("Y", "Dragon Breath"));
    this.storeOrUpdate(keybindFactory("2", "Ice Barrage"));
    this.storeOrUpdate(keybindFactory("3", "Wild Magic"));
    this.storeOrUpdate(keybindFactory("C", "Wrack"));
    this.storeOrUpdate(keybindFactory("5", "Dive"));
    this.storeOrUpdate(keybindFactory("CTRL-W", "Omnipower"));
    this.storeOrUpdate(keybindFactory("CTRL-Q", "Tsunami"));
  }

  protected importKeybindsFromLocalStorage(): Keybind[] {
    let plainObjects = JSON.parse(localStorage.getItem('keybinds') || JSON.stringify([]));

    return plainObjects.map((plainObject: any) => new Keybind(plainObject.keyCombination, new Ability(plainObject.ability.name)));
  }
}
