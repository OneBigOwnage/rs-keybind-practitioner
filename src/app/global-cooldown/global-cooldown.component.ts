import { Component, Input, OnInit } from '@angular/core';
import { GlobalCooldown } from '../GlobalCooldown';
import { GlobalCooldownDataService } from '../services/GlobalCooldownDataService';

@Component({
  selector: 'app-global-cooldown',
  templateUrl: './global-cooldown.component.html',
  styleUrls: ['./global-cooldown.component.scss']
})
export class GlobalCooldownComponent implements OnInit {

  @Input()
  globalCooldown!: GlobalCooldown;

  anywhere!: string;

  onFirstTick!: string;
  onSecondTick!: string;
  onThirdTick!: string;

  constructor(protected dataService: GlobalCooldownDataService) { }

  ngOnInit(): void {
  }

  showEdit() {
    document.querySelector(`.dialog.hidden[data-gcd-id="${this.globalCooldown.id}"]`)?.classList.remove('hidden');
  }

  save() {
    if (this.anywhere !== undefined) {
      this.globalCooldown.anywhere = this.anywhere.split(' ');
    }

    if (this.onFirstTick !== undefined) {
      this.globalCooldown.onFirstTick = this.onFirstTick.split(' ');
    }

    if (this.onSecondTick !== undefined) {
      this.globalCooldown.onSecondTick = this.onSecondTick.split(' ');
    }

    if (this.onThirdTick !== undefined) {
      this.globalCooldown.onThirdTick = this.onThirdTick.split(' ');
    }

    this.dataService.update(this.globalCooldown);

    this.hideEdit();
  }

  hideEdit() {
    document.querySelector(`.dialog[data-gcd-id="${this.globalCooldown.id}"]`)?.classList.add('hidden');
  }

  remove() {
    this.dataService.remove(this.globalCooldown);
  }

}
