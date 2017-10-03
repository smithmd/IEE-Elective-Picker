import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Education} from './classes/education';

declare const Visualforce: any;

@Injectable()
export class ElectiveDataService {
  public education = new BehaviorSubject<Education>(new Education());
  public educationId = new BehaviorSubject<string>(null);

  constructor(private http: Http) {
    this.educationId.subscribe({
      next: edId => {
        this.getEducation(edId);
      }
    });
  }

  private getEducation(edId: string) {
    if (edId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getEducation',
        edId,
        json => {
          if (json !== null) {
            const ed: Education = Education.createFromJson(json);
            this.education.next(ed);
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
