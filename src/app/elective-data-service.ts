import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Elective} from './classes/elective';
import {Education} from './classes/education';

declare const Visualforce: any;

@Injectable()
export class ElectiveDataService {
  public electiveList = new BehaviorSubject<Elective[]>([]);
  public education = new BehaviorSubject<Education>(new Education());
  public educationId = new BehaviorSubject<string>(null);
  public programMajorId = new BehaviorSubject<string>(null);

  constructor(private http: Http) {
    this.educationId.subscribe({
      next: edId => {
        if (edId !== null) {
          this.getEducation(edId);
        }
      }
    });

    this.programMajorId.subscribe({
      next: pmId => {
        if (pmId !== null) {
          this.getElectives(pmId);
        }
      }
    });
  }

  private getEducation(edId: string) {
    if (edId !== null) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getEducation',
        edId,
        json => {
          if (json !== null) {
            const ed: Education = Education.createFromJson(json);
            this.education.next(ed);
          }
        },
        {buffer: false}
      );
    }
  }

  private getElectives(pmId: string): void {
    if (pmId !== null) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getElectiveChoicesByProgramMajor',
        pmId,
        json => {
          if (json !== null) {
            const els: Elective[] = json.map(el => Elective.createFromJson(el));
            this.electiveList.next(els);
          }
        },
        {buffer: false}
      );
    }
  }
}
