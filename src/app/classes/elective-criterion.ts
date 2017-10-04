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

  public static createFromJson(json: string): ElectiveCriterion {
    const ec = new ElectiveCriterion();

    return Object.assign(ec, JSON.parse(json));
  }
}
