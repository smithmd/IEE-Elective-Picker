import {Injectable} from '@angular/core';
import {ElectiveCriterion} from './classes/elective-criterion';
import {Elective} from './classes/elective';
import {TypeCount} from './classes/type-count';
import {ElectiveDataService} from './elective-data-service';

@Injectable()
export class CriteriaCheckService {
  private static criterionIsMet(criterion: ElectiveCriterion, elective: Elective): boolean {
    // true if satisfied, false if not
    if (criterion.courseSession) {
      return criterion.typeList.indexOf(elective.electiveType) > -1
        && criterion.courseSession === elective.session;
    }
    return criterion.typeList.indexOf(elective.electiveType) > -1;
  }


  initializeTypeCriteriaList(pmId: string, electiveCriteria: Map<string, ElectiveCriterion[]>): ElectiveCriterion[] {
    let typeCriteria = [];
    const criteriaByPMId = electiveCriteria.get(pmId);
    if (criteriaByPMId) {
      typeCriteria = criteriaByPMId.filter(criterion => {
        return criterion.requirementType === 'type';
      });
      for (let i = 0; i < typeCriteria.length; i++) {
        typeCriteria[i].isSatisfied = false;
      }
    }

    return typeCriteria;
  }

  initializePeriodCriteriaList(pmId: string, electiveCriteria: Map<string, ElectiveCriterion[]>): ElectiveCriterion[] {
    let periodCriteria = [];
    const criteriaByPMId = electiveCriteria.get(pmId);
    if (criteriaByPMId) {
      periodCriteria = criteriaByPMId.filter(criterion => {
        return criterion.requirementType === 'period';
      });
      for (let i = 0; i < periodCriteria.length; i++) {
        periodCriteria[i].isSatisfied = false;
      }
    }

    return periodCriteria;
  }

  public checkCriteriaCheckMarks(typeCriteria: ElectiveCriterion[],
                                 primaryElectives: Elective[], criteriaMap: Map<string, number>) {
    // unset all check marks
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

  buildTypeCriteriaMap(ecs: ElectiveCriterion[]): Map<string, number> {
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
          // TODO: make sure this actually works
          closedTypeList.push(electiveType.type);
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
    periodCriteria.forEach(criterion => {
      const group1: number[] = criterion.periodGroup1.split(';').map(n => {
        return +n;
      });
      const group2: number[] = criterion.periodGroup2.split(';').map(n => {
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
          criterion.pg1Satisfied = true;
        } else if (b.indexOf(elective.startPeriod) > -1) {
          periodList = periodList.concat(a);
          criterion.pg2Satisfied = true;
        }
      });
    });
    return periodList;
  }

  countAvailableCriteria(typeCriteria: ElectiveCriterion[], broadcast: boolean): number {
    const available = typeCriteria.reduce((count, criterion) => {
      return count - (criterion.isSatisfied ? 1 : 0);
    }, typeCriteria.length);

    const availMapBySession = new Map<string, number>();
    typeCriteria.forEach(criterion => {
      if (criterion.courseSession && !criterion.isSatisfied) {
        const a = availMapBySession.get(criterion.courseSession) || 0;
        availMapBySession.set(criterion.courseSession, a + 1);
      }
    });

    if (broadcast) {
      this.electiveDataService.availableCriteria.next(available);
      this.electiveDataService.availableCriteriaBySession.next(availMapBySession);
    }

    return available;
  }

  constructor(private electiveDataService: ElectiveDataService) {
  }

}
