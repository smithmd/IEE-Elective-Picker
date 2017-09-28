import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Elective} from './elective';

declare const Visualforce: any;

@Injectable()
export class ElectiveDataService {
  public electiveList = new BehaviorSubject<Elective[]>([]);

  constructor(private http: Http) {
    // TODO: implement the vfremote function
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.getElectiveChoicesByProgramMajor',
      'a1n3B000000d1xOQAQ', // pass in something real from data
      json => {
        const els: Elective[] = json.map(el => Elective.createFromJson(el));
        this.electiveList.next(els);
      },
      {buffer: false}
    );

    // TODO: this loads the electives from the JSON test data. Remove it later.
    // this.getElectives().subscribe(json => {
    //   const els: Elective[] = json.map(el => Elective.createFromJson(el));
    //   this.electiveList.next(els);
    // });
  }

  public getElectives(): Observable<Elective[]> {
    return this.http.get('assets/electives.json')
      .map((response: any) => response.json());
  }
}
