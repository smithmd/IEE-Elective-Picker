export class Elective {
  schedule?: string;
  courseNumber?: string;
  courseDescription?: string;
  maxEnrollment?: number;
  electiveType?: string;
  electiveCorequisite?: string;
  term?: string;
  capacity?: number;
  enrolledCount?: number;

  private _isPrimary = false;
  private _isAlternate = false;

  public static createFromJson(json: any): Elective {
    const elective = new Elective();
    return Object.assign(elective, json);
  }

  get time(): string {
    return this.period.toString();
  }

  get period(): number {
    return parseInt(this.schedule.substr(0, this.schedule.indexOf('(')), 10);
  }

  get isPrimary(): boolean {
    return this._isPrimary;
  }

  set isPrimary(status: boolean) {
    this._isAlternate = false;
    this._isPrimary = status;
  }

  get isAlternate(): boolean {
    return this._isAlternate;
  }

  set isAlternate(status: boolean) {
    this._isPrimary = false;
    this._isAlternate = status;
  }
}
