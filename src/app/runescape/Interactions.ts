import { RunescapeAction } from "./RunescapeActions";
import { Keybind } from "./keybind-repository.service";

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
  constructor(public interactions: PlannedInteraction[] = []) { }

  public toString(): string {
    return '[' + this.interactions.map(interaction => interaction.toString()).join(', ') + ']';
  }
}

export function tickFactory(input: RunescapeAction[][], keybinds: Keybind[]): PlannedTick[] {
  return input.map(actions => {
    return new PlannedTick(actions.map(action => {
      const keybind = keybinds.find(keybind => keybind.ability.name === action);

      if (!keybind) {
        throw new Error('No keybind found for action ' + action);
      }

      return new ShouldPerformAction(keybind);
    }));

  });
}
