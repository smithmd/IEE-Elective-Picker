import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Elective} from '../../elective';

@Component({
  selector: 'iee-electives',
  templateUrl: './electives.component.html',
  styleUrls: ['./electives.component.css']
})
export class ElectivesComponent implements OnInit, OnChanges {
  @Input() electivesType: string;
  @Input() electives: Elective[];

  get displayedElectives(): Elective[] {
    return this.electives.filter((elective: Elective) => {
      if (this.isPrimary) {
        return !elective.isAlternate;
      }
      if (this.isAlternate) {
        return !elective.isPrimary;
      }
      return true;
    });
  }

  get isPrimary() {
    return this.electivesType.toLowerCase() === 'primary';
  }

  get isAlternate() {
    return this.electivesType.toLowerCase() === 'alternate';
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
