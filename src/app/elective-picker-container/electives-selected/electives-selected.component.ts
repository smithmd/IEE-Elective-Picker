import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../classes/elective';

@Component({
  selector: 'iee-electives-selected',
  templateUrl: './electives-selected.component.html',
  styleUrls: ['./electives-selected.component.css']
})
export class ElectivesSelectedComponent implements OnInit {
  @Input() electives: Elective[];

  get electivesPicked(): boolean {
    if (this.electives) {
      return this.electives.reduce((result, elective) => {
        return result || (elective.isPrimary || elective.isAlternate);
      }, false);
    }

    return false;
  }

  get primaries(): Elective[] {
    return this.electives.filter((elective) => {
      return elective.isPrimary;
    });
  }

  get alternates(): Elective[] {
    return this.electives.filter((elective) => {
      return elective.isAlternate;
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
