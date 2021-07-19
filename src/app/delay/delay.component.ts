import { Component, Input, OnInit } from '@angular/core';
import { Delay } from '../Delay';
import { GlobalCooldownDataService } from '../services/GlobalCooldownDataService';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {

  @Input()
  delay!: Delay;

  constructor(protected dataService: GlobalCooldownDataService) { }

  ngOnInit(): void {
  }

  remove() {
    this.dataService.remove(this.delay);
  }
}
