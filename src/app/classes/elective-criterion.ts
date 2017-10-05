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

  public static createFromJson(json): ElectiveCriterion {
    const ec = new ElectiveCriterion();
    return Object.assign(ec, json);
  }

  get description(): string {
    if (this.criterionDescription) {
      return this.criterionDescription;
    } else if (this.requirementType === 'period') {
      // time based description
      return 'One elective in period '
        + this.periodGroup1.replace(/;/g, ',')
        + ' or '
        + this.periodGroup2.replace(/;/g, ',');
    } else if (this.requirementType === 'type') {
      // elective type based description
      return 'One elective in ' + this.electiveTypes.replace(/;/g, ' or ');
    }
  }
}
