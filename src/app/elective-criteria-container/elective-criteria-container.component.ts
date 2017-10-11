import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {ElectiveCriterion} from '../classes/elective-criterion';
import {ElectiveDataService} from '../elective-data-service';
import {Elective} from '../classes/elective';

class TypeCount {
  type: string;
  count: number;
}

@Component({
  selector: 'iee-elective-criteria-container',
  templateUrl: './elective-criteria-container.component.html',
  styleUrls: ['./elective-criteria-container.component.less']
})
export class ElectiveCriteriaContainerComponent implements OnInit, DoCheck {
  @Input() activeProgramMajorId: string;
  electives: Elective[] = [];
  periodCriteria: ElectiveCriterion[] = [];
  typeCriteria: ElectiveCriterion[] = [];
  criteriaTypeCounts: TypeCount[] = [];
  electiveTypeCounts: TypeCount[] = [];
  criteriaMap: Map<string, number> = new Map<string, number>();
  private _oldElectiveLength = 0;

  get primaryElectives(): Elective[] {
    return this.electives.filter((elective) => {
      return elective.isPrimary;
    });
  }

  static criterionIsMet(criterion: ElectiveCriterion, elective: Elective): boolean {
    // true if satisfied, false if not
    return criterion.typeList.indexOf(elective.electiveType) > -1;
  }

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngDoCheck(): void {
    if (this._oldElectiveLength !== this.primaryElectives.length) {
      this._oldElectiveLength = this.primaryElectives.length;

      this.criteriaTypeCounts = this.buildCriteriaCounts(this.typeCriteria);
      this.checkChosen();
      this.checkClosedTypes();
      this.checkCriteriaCheckMarks();
      this.countAvailableCriteria();
    }
  }

  ngOnInit() {
    this.electiveDataService.electiveCriteria.asObservable().subscribe({
      next: data => {
        if (data) {
          this.typeCriteria = data[this.activeProgramMajorId].filter(criterion => {
            return criterion.requirementType === 'type';
          });
          for (let i = 0; i < this.typeCriteria.length; i++) {
            this.typeCriteria[i].isSatisfied = false;
          }

          this.periodCriteria = data[this.activeProgramMajorId].filter(criterion => {
            return criterion.requirementType === 'period';
          });

          this.criteriaTypeCounts = this.buildCriteriaCounts(this.typeCriteria);
          this.electiveTypeCounts = this.checkChosen();
          this.checkClosedTypes();
          this.checkCriteriaCheckMarks();
          this.countAvailableCriteria();
        }
      }
    });

    this.electiveDataService.education.asObservable().subscribe({
      next: data => {
        this.electives = data.electivesByProgramMajorIds[this.activeProgramMajorId];
      }
    });
  }

  buildCriteriaCounts(ecs: ElectiveCriterion[]): TypeCount[] {
    ecs.forEach(criterion => {
      criterion.typeList.forEach(type => {
        const count = this.criteriaMap.get(type);
        if (!count) {
          this.criteriaMap.set(type, 1);
        } else {
          this.criteriaMap.set(type, count + 1);
        }
      });
    });
    const criteriaList: TypeCount[] = [];
    for (const c of Array.from(this.criteriaMap.entries())) {
      criteriaList.push({type: c[0], count: c[1]});
    }
    criteriaList.sort((a, b) => {
      return b.count - a.count;
    });

    return criteriaList;
  }

  checkChosen(): TypeCount[] {
    const electiveTypeCountMap: Map<string, number> = new Map<string, number>();
    this.primaryElectives.forEach(elective => {
      const count = electiveTypeCountMap.get(elective.electiveType);
      if (!count) {
        electiveTypeCountMap.set(elective.electiveType, 1);
      } else {
        electiveTypeCountMap.set(elective.electiveType, count + 1);
      }
    });

    const typeList: TypeCount[] = [];
    for (const c of Array.from(electiveTypeCountMap.entries())) {
      typeList.push({type: c[0], count: c[1]});
    }

    typeList.sort((a, b) => {
      return b.count - a.count;
    });
    return typeList;
  }

  checkClosedTypes() {
    const closedTypeList: string[] = [];
    console.log('criteria type counts: ');
    console.log(this.criteriaTypeCounts);
    console.log('elective type counts: ');
    console.log(this.electiveTypeCounts);
    this.criteriaTypeCounts.forEach(criteriaType => {
      this.electiveTypeCounts.forEach(electiveType => {
        if (criteriaType.type === electiveType.type && criteriaType.count === electiveType.count) {
          closedTypeList.push();
        }
      });
    });

    this.electiveDataService.closedTypes.next(closedTypeList);
  }

  countAvailableCriteria() {
    this.electiveDataService.availableCriteria.next(

      this.typeCriteria.reduce((count, criterion) => {
        return count - (criterion.isSatisfied ? 1 : 0);
      }, this.typeCriteria.length)

    );
  }

  checkCriteriaCheckMarks() {
    for (let i = 0; i < this.typeCriteria.length; i++) {
      this.typeCriteria[i].isSatisfied = false;
    }

    const es = this.primaryElectives.slice(0);
    es.sort((a, b) => {
      return this.criteriaMap.get(a.electiveType) - this.criteriaMap.get(b.electiveType);
    });

    es.forEach(elective => {
      for (let i = 0; i < this.typeCriteria.length; i++) {
        if (this.typeCriteria[i].isSatisfied) {
          continue;
        }

        if (ElectiveCriteriaContainerComponent.criterionIsMet(this.typeCriteria[i], elective)) {
          this.typeCriteria[i].isSatisfied = true;
          break;
        }
      }
    });
  }
}
