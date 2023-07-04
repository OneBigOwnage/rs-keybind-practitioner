import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import TickRepository from '../TickRepository.service';
import { PlannedTick } from '../Interactions';
import { Rotation, RotationRepository } from '../rotation-repository.service';
import Game from '../Game.service';

@Component({
  selector: 'app-rotations-overview',
  templateUrl: './rotations-overview.component.html',
  styleUrls: ['./rotations-overview.component.scss']
})
export class RotationsOverview implements OnInit {

  constructor(public repo: RotationRepository, public game: Game) { }

  ngOnInit(): void {
  }

  public createNew(): void {
    this.repo.addRotation(new Rotation(this.randomID(), 'My first rotation', []));
  }

  protected randomID(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from({ length: 5 }).reduce((result: string) => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return result + characters.charAt(randomIndex);

    }, "");
  }
}
