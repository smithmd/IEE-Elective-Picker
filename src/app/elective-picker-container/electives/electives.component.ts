import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../elective';

@Component({
  selector: 'iee-electives',
  templateUrl: './electives.component.html',
  styleUrls: ['./electives.component.css']
})
export class ElectivesComponent implements OnInit {
  @Input() electivesList: Elective[];

  constructor() { }

  ngOnInit() {
  }

}
