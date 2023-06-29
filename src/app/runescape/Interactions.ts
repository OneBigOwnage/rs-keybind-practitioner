
export class ShouldPressKey {
  constructor(public readonly key: string) { }
}

export class SuccessfulKeyPress {
  constructor(public readonly key: string) { }
}

export class MissedKeyPress {
  constructor(public readonly key: string) { }
}

export class UnexpectedKeyPress {
  constructor(public readonly key: string) { }
}

export type Interaction =
  ShouldPressKey
  | SuccessfulKeyPress
  | MissedKeyPress
  | UnexpectedKeyPress;

export type PlannedInteraction = ShouldPressKey;

export type RecordedInteraction =
  SuccessfulKeyPress
  | MissedKeyPress
  | UnexpectedKeyPress;

export class Tick {
  constructor (public interactions: Interaction[] = []) { }
}

export function tickFactory(input: string = ''): Tick {
  return new Tick(input.split(' ').map(key => new ShouldPressKey(key)));
}
