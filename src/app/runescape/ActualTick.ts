export class ActualTick {
  constructor(
    public readonly ID: string,
    public readonly timestamp: number,
    public keyPresses: string[],
    public clicks: { x: number, y: number }[]
  ) { }
}
