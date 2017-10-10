export class ElectiveCriterion {
  isRequired: boolean;
  requirementType: string;
  electiveTypes: string;
  courseSession: string;
  criterionDescription: string;
  criterionName: string;
  periodGroup1: string;
  periodGroup2: string;
  programMajorId: string;

  // TODO: should be global somehow
  private timePeriodMap = {
    1: '8:00am',
    2: '9:00am',
    3: '10:00am',
    4: '11:00am',
    5: '12:00pm',
    6: '1:00pm',
    7: '2:00pm',
    8: '3:00pm',
    9: '4:00pm',
    10: '5:00pm'
  };

  public static createFromJson(json): ElectiveCriterion {
    const ec = new ElectiveCriterion();
    return Object.assign(ec, json);
  }

  get description(): string {
    let description: string;
    if (this.criterionDescription) {
      description = this.criterionDescription;
    } else if (this.requirementType === 'period') {
      // time based description
      description = 'Electives either at '
        + this.getPeriodTimes(this.periodGroup1).join(', ')
        + ' or '
        + this.getPeriodTimes(this.periodGroup2).join(', ');
    } else if (this.requirementType === 'type') {
      // elective type based description
      description = 'One elective in ' + this.electiveTypes.replace(/;/g, ' or ');
    }

    return description + (this.isRequired ? '' : ' (Optional)');
  }

  getPeriodTimes(periods: string): string[] {
    const periodArray: string[] = periods.split(';');
    return periodArray.map(period => {
      return this.timePeriodMap[parseInt(period, 10)];
    });
  }

  get typeList(): string[] {
    return this.electiveTypes.split(';');
  }
}
