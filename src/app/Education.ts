export class Education {
  sessions: Array<string> = [];
  programMajorIds: Array<string> = [];
  educationId = '';

  public static createFromJson(json: any): Education {
    const ed = new Education();
    return Object.assign(ed, json);
  }
}
