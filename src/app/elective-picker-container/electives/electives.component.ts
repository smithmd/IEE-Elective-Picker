import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../elective';

@Component({
  selector: 'iee-electives',
  templateUrl: './electives.component.html',
  styleUrls: ['./electives.component.css']
})
export class ElectivesComponent implements OnInit {
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

  get selectedPeriods(): number[] {
    const periods: number[] = [];
    this.electives.forEach((elective: Elective) => {
      if ((this.isPrimary && elective.isPrimary) || (this.isAlternate && elective.isAlternate)) {
        if (periods.indexOf(elective.period) < 0) {
          periods.push(elective.period);
        }
      }
    });

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
}
