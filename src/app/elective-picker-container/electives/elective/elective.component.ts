import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-elective',
  templateUrl: './elective.component.html',
  styleUrls: ['./elective.component.css']
})
export class ElectiveComponent implements OnInit {
  @Input() elective: Elective;

  constructor() { }

  ngOnInit() {
  }
}
