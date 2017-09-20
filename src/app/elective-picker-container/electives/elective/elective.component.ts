import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../../elective';

@Component({
  selector: 'iee-elective',
  templateUrl: './elective.component.html',
  styleUrls: ['./elective.component.css']
})
export class ElectiveComponent implements OnInit {
  @Input() elective: Elective;

  constructor() { }

  ngOnInit() {
  }
}
