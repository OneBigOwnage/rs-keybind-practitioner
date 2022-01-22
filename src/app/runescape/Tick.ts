export class Tick {
  constructor(
    public readonly timestamp: number,
    public keyPresses: string[],
    public clicks: { x: number, y: number }[]
  ) { }
}
