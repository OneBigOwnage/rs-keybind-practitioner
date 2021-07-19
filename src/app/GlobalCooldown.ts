export class GlobalCooldown {

  constructor(
    public id: string,
    public anywhere: string[] = [],
    public onFirstTick: string[] = [],
    public onSecondTick: string[] = [],
    public onThirdTick: string[] = []
  ) { }

}
