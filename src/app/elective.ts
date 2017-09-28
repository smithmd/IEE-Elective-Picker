export class Elective {
  id: string;
  courseNumber: string;
  electiveType: string;
  electiveCorequisiteId: string;
  term: string;
  section: string;
  session: string;
  startPeriod: number;
  endPeriod: number;

  enrolledCount: number;
  maxEnrollment: number;

  private _courseDescription: string;
  private _isPrimary = false;
  private _isAlternate = false;

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

  public static createFromJson(json: any): Elective {
    const elective = new Elective();
    return Object.assign(elective, json);
  }

  get courseDescription(): string {
    return this._courseDescription.substring(this._courseDescription.indexOf(' '));
  }

  set courseDescription(value: string) {
    this._courseDescription = value;
  }

  get time(): string {
    return this.timePeriodMap[this.startPeriod];
  }

  get startTime(): string {
    return this.timePeriodMap[this.startPeriod];
  }

  get endTime(): string {
    return this.timePeriodMap[this.endPeriod + 1];
  }

  get isPrimary(): boolean {
    return this._isPrimary;
  }

  set isPrimary(status: boolean) {
    this._isPrimary = status;
  }

  get isAlternate(): boolean {
    return this._isAlternate;
  }

  set isAlternate(status: boolean) {
    this._isAlternate = status;
  }
}
