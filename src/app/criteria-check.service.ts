import {Injectable} from '@angular/core';
import {ElectiveCriterion} from './classes/elective-criterion';
import {Elective} from './classes/elective';
import {TypeCount} from './classes/type-count';
import {ElectiveDataService} from './elective-data-service';

@Injectable()
export class CriteriaCheckService {
  private static criterionIsMet(criterion: ElectiveCriterion, elective: Elective): boolean {
    // true if satisfied, false if not
    return criterion.typeList.indexOf(elective.electiveType) > -1;
  }


  initializeTypeCriteriaList(pmId: string, electiveCriteria: Map<string, ElectiveCriterion[]>): ElectiveCriterion[] {
    const typeCriteria = electiveCriteria.get(pmId).filter(criterion => {
      return criterion.requirementType === 'type';
    });
    for (let i = 0; i < typeCriteria.length; i++) {
      typeCriteria[i].isSatisfied = false;
    }

    return typeCriteria;
  }

  initializePeriodCriteriaList(pmId: string, electiveCriteria: Map<string, ElectiveCriterion[]>): ElectiveCriterion[] {
    const periodCriteria = electiveCriteria.get(pmId).filter(criterion => {
      return criterion.requirementType === 'period';
    });
    for (let i = 0; i < periodCriteria.length; i++) {
      periodCriteria[i].isSatisfied = false;
    }

    return periodCriteria;
  }

  public checkCriteriaCheckMarks(typeCriteria: ElectiveCriterion[],
                                 primaryElectives: Elective[], criteriaMap: Map<string, number>) {

    for (let i = 0; i < typeCriteria.length; i++) {
      typeCriteria[i].isSatisfied = false;
    }

    const es = primaryElectives.slice(0);
    es.sort((a, b) => {
      return criteriaMap.get(a.electiveType) - criteriaMap.get(b.electiveType);
    });

    es.forEach(elective => {
      for (let i = 0; i < typeCriteria.length; i++) {
        if (typeCriteria[i].isSatisfied) {
          continue;
        }

        if (CriteriaCheckService.criterionIsMet(typeCriteria[i], elective)) {
          typeCriteria[i].isSatisfied = true;
          break;
        }
      }
    });
  }

  buildCriteriaMap(ecs: ElectiveCriterion[]): Map<string, number> {
    const criteriaMap: Map<string, number> = new Map<string, number>();
    ecs.forEach(criterion => {
      criterion.typeList.forEach(type => {
        const count = criteriaMap.get(type);
        if (!count) {
          criteriaMap.set(type, 1);
        } else {
          criteriaMap.set(type, count + 1);
        }
      });
    });

    return criteriaMap;
  }

  buildCriteriaCounts(ecs: ElectiveCriterion[], criteriaMap: Map<string, number>): TypeCount[] {
    const criteriaList: TypeCount[] = [];
    for (const c of Array.from(criteriaMap.entries())) {
      criteriaList.push({type: c[0], count: c[1]});
    }
    criteriaList.sort((a, b) => {
      return b.count - a.count;
    });

    return criteriaList;
  }

  checkChosen(primaryElectives: Elective[]): TypeCount[] {
    const electiveTypeCountMap: Map<string, number> = new Map<string, number>();
    primaryElectives.forEach(elective => {
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

  checkClosedTypes(criteriaTypeCounts: TypeCount[], electiveTypeCounts: TypeCount[]): string[] {
    const closedTypeList: string[] = [];
    criteriaTypeCounts.forEach(criteriaType => {
      electiveTypeCounts.forEach(electiveType => {
        if (criteriaType.type === electiveType.type && criteriaType.count === electiveType.count) {
          closedTypeList.push();
        }
      });
    });

    return closedTypeList;
  }

  checkClosedPeriods(periodCriteria: ElectiveCriterion[], primaryElectives: Elective[]): number[] {
    let periodList: number[] = [];
    // reset all checkbox booleans
    periodCriteria.forEach(c => {
      c.pg2Satisfied = false;
      c.pg1Satisfied = false;
    });
    periodCriteria.forEach(criteria => {
      const group1: number[] = criteria.periodGroup1.split(';').map(n => {
        return +n;
      });
      const group2: number[] = criteria.periodGroup2.split(';').map(n => {
        return +n;
      });

      // remove values that are in both lists
      const a: number[] = group1.filter(period => {
        return !(group2.indexOf(period) > -1);
      });
      const b: number[] = group2.filter(period => {
        return !(group1.indexOf(period) > -1);
      });
      primaryElectives.forEach(elective => {
        if (a.indexOf(elective.startPeriod) > -1) {
          periodList = periodList.concat(b);
          criteria.pg1Satisfied = true;
        } else if (b.indexOf(elective.startPeriod) > -1) {
          periodList = periodList.concat(a);
          criteria.pg2Satisfied = true;
        }
      });
    });
    return periodList;
  }

  countAvailableCriteria(typeCriteria: ElectiveCriterion[], broadcast: boolean): number {
    const available = typeCriteria.reduce((count, criterion) => {
      return count - (criterion.isSatisfied ? 1 : 0);
    }, typeCriteria.length);

    if (broadcast) {
      this.electiveDataService.availableCriteria.next(available);
    }

    return available;
  }

  constructor(private electiveDataService: ElectiveDataService) {
  }

}
