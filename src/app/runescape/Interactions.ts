import { RunescapeAction } from "./RunescapeActions";
import { Ability, Keybind } from "./keybind-repository.service";

export class ShouldPerformAction {
  constructor(public readonly keybind: Keybind) { }

  public key(): string {
    return this.keybind.keyCombination;
  }

  public toString(): string {
    return this.keybind.ability.name + ' (' + this.keybind.keyCombination + ')';
  }
}

export class SuccessfullyPerformedAction {
  constructor(public readonly keybind: Keybind) { }

  public key(): string {
    return this.keybind.keyCombination;
  }

  public toString(): string {
    return this.keybind.ability.name + ' (' + this.keybind.keyCombination + ')';
  }
}

export class MissedAction {
  constructor(public readonly keybind: Keybind) { }

  public key(): string {
    return this.keybind.keyCombination;
  }

  public toString(): string {
    return this.keybind.ability.name + ' (' + this.keybind.keyCombination + ')';
  }
}

export class UnexpectedKeyPress {
  constructor(public readonly keyCombination: string) { }

  public key(): string {
    return this.keyCombination;
  }

  public toString(): string {
    return this.key();
  }
}

export type Interaction =
  ShouldPerformAction
  | SuccessfullyPerformedAction
  | MissedAction
  | UnexpectedKeyPress;

export type PlannedInteraction = ShouldPerformAction;

export type RecordedInteraction =
  SuccessfullyPerformedAction
  | MissedAction
  | UnexpectedKeyPress;

export class Tick {
  constructor(public interactions: Interaction[] = []) { }

  public toString(): string {
    return '[' + this.interactions.map(interaction => interaction.toString()).join(', ') + ']';
  }
}

export class PlannedTick {
  constructor(public actions: Ability[] = []) { }

  public withKeybinds(keybinds: Keybind[]): PlannedTickWithKeybind {
    return new PlannedTickWithKeybind(
      this.actions.map(action => {
        let keybind = keybinds.find(keybind => keybind.ability.name === action.name);

        if (keybind === undefined) {
          throw new Error('No keybind found for ' + action.name);
        }

        return new ShouldPerformAction(keybind);
      })
    );
  }

  public toString(): string {
    if (this.actions.length === 0) {
      return '<empty>';
    }

    return '[' + this.actions.map(interaction => interaction.toString()).join(', ') + ']';
  }
}

export class PlannedTickWithKeybind extends PlannedTick {
  constructor(public interactions: PlannedInteraction[] = []) {
    super(interactions.map(interaction => interaction.keybind.ability));
  }
}

export function tickFactory(input: RunescapeAction[][]): PlannedTick[] {
  return input.map(actions => new PlannedTick(actions.map(action => new Ability(action))));
}
