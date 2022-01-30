import { Component, OnInit } from '@angular/core';
import RotationRepository from '../RotationRepository.service';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

  constructor(public repo: RotationRepository) { }

  ngOnInit(): void {
  }

}
