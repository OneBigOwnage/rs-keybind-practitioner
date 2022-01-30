export class PlannedTick {
  constructor(
    public readonly ID: string,
    public keyPresses: string[],
    public clicks: { x: number, y: number }[]
  ) { }
}
