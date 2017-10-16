import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Elective} from '../../classes/elective';
import {ElectiveDataService} from '../../elective-data-service';

@Component({
  selector: 'iee-electives',
  templateUrl: './electives.component.html',
  styleUrls: ['./electives.component.css']
})
export class ElectivesComponent implements OnInit, OnDestroy {
  @Input() electivesType: string;
  @Input() electives: Elective[];
  closedTypes: string[] = [];
  closedPeriods: number[] = [];
  private availableCriteriaCount: number;

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

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.closedTypes.asObservable().subscribe({
      next: closed => {
        this.closedTypes = closed;
      }
    });
    this.electiveDataService.availableCriteria.asObservable().subscribe({
      next: available => {
        this.availableCriteriaCount = available;
      }
    });
    this.electiveDataService.closedPeriods.asObservable().subscribe({
      next: closed => {
        this.closedPeriods = closed;
      }
    });
  }

  ngOnDestroy() {
    this.electiveDataService.closedTypes.unsubscribe();
    this.electiveDataService.closedPeriods.unsubscribe();
    this.electiveDataService.availableCriteria.unsubscribe();
  }

  private periodFilled(period: number, primary: boolean): boolean {
    if (primary === true) {
      return (this.closedPeriods.indexOf(period) > -1 || this.selectedPeriods.indexOf(period) > -1);
    }
    return this.selectedPeriods.indexOf(period) > -1;
  }

  private typeClosed(electiveType: string): boolean {
    return this.closedTypes.indexOf(electiveType) > -1;
  }

  private electiveCriteriaFilled(): boolean {
    return this.availableCriteriaCount === 0;
  }

  isDisabled(elective: Elective) {
    return this.periodFilled(elective.startPeriod, this.isPrimary) ||
      this.periodFilled(elective.endPeriod, this.isPrimary) ||
      (this.isPrimary &&
        (this.typeClosed(elective.electiveType) ||
          this.electiveCriteriaFilled()
        )
      );
  }
}
