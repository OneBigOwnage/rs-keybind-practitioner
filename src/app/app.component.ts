import { Component } from '@angular/core';
import { Delay } from './Delay';
import { GlobalCooldown } from './GlobalCooldown';
import { GlobalCooldownDataService } from './services/GlobalCooldownDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dataService: GlobalCooldownDataService) { }

  addGcd() {
    let id = Array.from(crypto.getRandomValues(new Uint8Array(20)), dec => dec.toString(16).padStart(2, "0")).join('');

    this.dataService.add(new GlobalCooldown(id));
  }

  waitTicks(number: number) {
    let id = Array.from(crypto.getRandomValues(new Uint8Array(20)), dec => dec.toString(16).padStart(2, "0")).join('');

    this.dataService.add(new Delay(id, number));
  }

  isGlobalCooldown(gcdOrDelay: GlobalCooldown | Delay): gcdOrDelay is GlobalCooldown {
    return gcdOrDelay instanceof GlobalCooldown;
  }

  isDelay(gcdOrDelay: GlobalCooldown | Delay): gcdOrDelay is Delay {
    return gcdOrDelay instanceof Delay;
  }

}
