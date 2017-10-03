import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../classes/elective';

@Component({
  selector: 'iee-electives',
  templateUrl: './electives.component.html',
  styleUrls: ['./electives.component.css']
})
export class ElectivesComponent implements OnInit {
  @Input() electivesType: string;
  @Input() electives: Elective[];

  get displayedElectives(): Elective[] {
    if (this.electives) {
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

    return [];
  }

  get selectedPeriods(): number[] {
    const periods: number[] = [];
    if (this.electives) {
      this.electives.forEach((elective: Elective) => {
        if ((this.isPrimary && elective.isPrimary) || (this.isAlternate && elective.isAlternate)) {
          if (periods.indexOf(elective.startPeriod) < 0) {
            periods.push(elective.startPeriod);
          }
          // INFO: works as long as our classes are not more than 2 hours long
          if (periods.indexOf(elective.endPeriod) < 0) {
            periods.push(elective.endPeriod);
          }
        }
      });
    }

    return periods;
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

  periodFilled(period: number): boolean {
    return this.selectedPeriods.indexOf(period) > -1;
  }

  isDisabled(elective: Elective) {
    return this.periodFilled(elective.startPeriod) || this.periodFilled(elective.endPeriod);
  }
}
