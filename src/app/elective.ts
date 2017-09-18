class Elective {
  readonly period: number;
  readonly description: string;
  readonly type: string;
  readonly time: string;
  readonly term: string;
  readonly capacity: number;
  readonly enrolledCount: number;

  private _isPrimary = false;
  private _isAlternate = false;

  constructor(period: number, description: string, type: string, time: string, term: string, capacity: number, enrolledCount: number) {
    this.period = period;
    this.description = description;
    this.type = type;
    this.time = time;
    this.term = term;
    this.capacity = capacity;
    this.enrolledCount = enrolledCount;
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
