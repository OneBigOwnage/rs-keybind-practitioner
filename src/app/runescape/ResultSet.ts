export default class ResultSet {
  constructor(
    public readonly ID: string,
    public correctKeyPresses: string[],
    public incorrectKeyPresses: string[],
    public correctClicks: { x: number, y: number }[],
    public incorrectClicks: { x: number, y: number }[],
  ) { }
}
