import { Component } from '@angular/core';
import TickRepository from '../TickRepository.service';

@Component({
  selector: 'app-tracker-results',
  templateUrl: './tracker-results.component.html',
  styleUrls: ['./tracker-results.component.scss']
})
export class TrackerResultsComponent {
  constructor(public repo: TickRepository) { }
}
