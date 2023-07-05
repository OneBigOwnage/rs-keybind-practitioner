import { Component, OnInit } from '@angular/core';
import { AbilityRotation, RotationRepository } from '../rotation-repository.service';
import Game from '../Game.service';
import { BehaviorSubject } from 'rxjs';
import { Ability, KeybindRepository } from '../keybind-repository.service';

@Component({
  selector: 'app-rotations-overview',
  templateUrl: './rotations-overview.component.html',
  styleUrls: ['./rotations-overview.component.scss']
})
export class RotationsOverview implements OnInit {

  public rotationToEdit: BehaviorSubject<AbilityRotation | undefined> = new BehaviorSubject<AbilityRotation | undefined>(undefined);

  constructor(public repo: RotationRepository, public game: Game, public keybinds: KeybindRepository) {
    // this.repo.rotations$().subscribe(rotations => {
    //   if (this.rotationToEdit.value === undefined) {
    //     this.rotationToEdit.next(rotations[0]);
    //   }
    // });
  }

  ngOnInit(): void {
  }

  public createNew(): void {
    this.repo.addRotation(new AbilityRotation(this.randomID(), 'New rotation', []));
  }

  public actionsPreview(rotation: AbilityRotation): Ability[] {
    return rotation.ticks.reduce((result: Ability[], tick) => result = result.concat(tick.actions), []).slice(0, 6);
  }

  protected randomID(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from({ length: 5 }).reduce((result: string) => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return result + characters.charAt(randomIndex);

    }, "");
  }
}
