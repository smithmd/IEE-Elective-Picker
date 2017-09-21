import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../elective';

@Component({
  selector: 'iee-electives-selected',
  templateUrl: './electives-selected.component.html',
  styleUrls: ['./electives-selected.component.css']
})
export class ElectivesSelectedComponent implements OnInit {
  @Input() electives: Elective[];

  get selectedElectives(): Elective[] {
    return this.electives.filter((elective) => {
      return elective.isAlternate || elective.isPrimary;
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
