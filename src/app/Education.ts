export class Education {
  sessions: Array<string>;
  educationId: string;

  public static createFromJson(json: any): Education {
    const ed = new Education();
    return Object.assign(ed, json);
  }
}
