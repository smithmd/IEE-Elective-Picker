import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Education} from './classes/education';
import {ElectiveCriterion} from './classes/elective-criterion';

declare const Visualforce: any;

@Injectable()
export class ElectiveDataService {
  public education = new BehaviorSubject<Education>(new Education());
  public educationId = new BehaviorSubject<string>(null);
  public electiveCriteria = new BehaviorSubject<Map<string, ElectiveCriterion[]>>(null);
  public closedTypes = new BehaviorSubject<string[]>([]);
  public availableCriteria = new BehaviorSubject<number>(0);
  public closedPeriods = new BehaviorSubject<number[]>([]);
  public activeProgramMajorId = new BehaviorSubject<string>(null);

  constructor() {
    this.educationId.asObservable().subscribe({
      next: edId => {
        this.getEducation(edId);
      }
    });
  }

  private getEducation(edId: string): void {
    if (edId) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getEducation',
        edId,
        json => {
          if (json !== null) {
            const ed: Education = Education.createFromJson(json);
            this.education.next(ed);
            this.getElectiveCriteria(ed.programMajorIds);
          }
        },
        {buffer: false, escape: false}
      );
    }
  }

  private getElectiveCriteria(pmIds: string[]): void {
    if (pmIds && pmIds.length > 0) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getElectiveRequirements',
        pmIds,
        json => {
          const criteriaMap = new Map<string, ElectiveCriterion[]>();
          if (json !== null) {
            const parsedJson = JSON.parse(json);
            for (const pm in parsedJson) {
              if (parsedJson.hasOwnProperty(pm)) {
                criteriaMap.set(pm, parsedJson[pm].map(ec => {
                  return ElectiveCriterion.createFromJson(ec);
                }));
              }
            }
          }
          this.electiveCriteria.next(criteriaMap);
        },
        {buffer: false, escape: false}
      );
    }
  }

  updateAvailabilityCounts() {
    if (this.education) {
      Visualforce.remoting.Manager.invokeAction(
        'IEE_ElectivePicker_Controller.getRequestCounts',
        this.activeProgramMajorId.getValue(),
        (result: string) => {
          const j = JSON.parse(result);
          for (const courseSectionId in j) {
            if (j.hasOwnProperty(courseSectionId)) {
              const electives = this.education.getValue().electivesByProgramMajorIds[this.activeProgramMajorId.getValue()];
              for (let i = 0; i < electives.length; i++) {
                if (courseSectionId === electives[i].id) {
                  electives[i].enrolledCount = j[courseSectionId];
                  electives[i].isUpdating = false;
                  break;
                }
              }
            }
          }
        },
        {buffer: false, escape: false}
      );
    }
  }
}
