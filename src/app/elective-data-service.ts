import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Elective} from './elective';
import {Education} from "./Education";

declare const Visualforce: any;

@Injectable()
export class ElectiveDataService {
  public electiveList = new BehaviorSubject<Elective[]>([]);
  public education = new BehaviorSubject<Education>(new Education());
  public educationId = new BehaviorSubject<string>('');
  public programMajorId = new BehaviorSubject<string>('');

  constructor(private http: Http) {
    this.educationId.subscribe({
      next: edId => {
        this.getEducation(edId);
      }
    });

    this.programMajorId.subscribe({
      next: pmId => {
        this.getElectives(pmId);
      }
    });
  }

  public getEducation(edId: string) {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.getEducation',
      edId,
      json => {
        const ed: Education = Education.createFromJson(json);
        this.education.next(ed);
      },
      {buffer: false}
    );
  }

  public getElectives(programMajorId: string): void {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.getElectiveChoicesByProgramMajor',
      programMajorId,
      json => {
        const els: Elective[] = json.map(el => Elective.createFromJson(el));
        this.electiveList.next(els);
      },
      {buffer: false}
    );
  }
}
