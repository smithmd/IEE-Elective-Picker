import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';
import {Elective} from '../classes/elective';
import {CriteriaCheckService} from '../criteria-check.service';
import {ElectiveCriterion} from '../classes/elective-criterion';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

declare const Visualforce: any;

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit {
  education: Education;
  readyToSubmit = false;
  primaryElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  alternateElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  availableCriteriaByProgramMajorIds: Map<string, number> = new Map<string, number>();
  electiveCriteria: Map<string, ElectiveCriterion[]> = new Map<string, ElectiveCriterion[]>();

  constructor(private electiveDataService: ElectiveDataService, private criteriaCheckService: CriteriaCheckService) {
  }

  ngOnInit() {
    const electiveObs = this.electiveDataService.electiveCriteria.asObservable();
    const educationObs = this.electiveDataService.education.asObservable();

    Observable.combineLatest(electiveObs, educationObs).subscribe((o) => {
      [this.electiveCriteria, this.education] = o;

      this.education.programMajorIds.forEach(pmId => {
        if (this.education.electivesByProgramMajorIds[pmId]) {
          this.primaryElectivesByProgramMajorIds.set(pmId, this.education.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isPrimary;
          }));
          this.alternateElectivesByProgramMajorIds.set(pmId, this.education.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isAlternate;
          }));
        } else {
          this.primaryElectivesByProgramMajorIds.set(pmId, []);
          this.alternateElectivesByProgramMajorIds.set(pmId, []);
        }

        if (this.electiveCriteria.get(pmId)) {
          const typeCriteria = this.electiveCriteria.get(pmId).filter(c => {
            return c.requirementType === 'type';
          });

          const primaryElectives = this.primaryElectivesByProgramMajorIds.get(pmId);

          const criteriaMap = this.criteriaCheckService.buildTypeCriteriaMap(typeCriteria);
          this.criteriaCheckService.checkCriteriaCheckMarks(typeCriteria, primaryElectives, criteriaMap);

          this.availableCriteriaByProgramMajorIds.set(pmId,
            this.criteriaCheckService.countAvailableCriteria(typeCriteria, false));
        }
      });
    });
  }

  onSubmit() {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.saveElectiveComplete',
      this.education.educationId,
      (saved: boolean) => {
        // saved
      }
    );
  }

  onClickCheckbox() {
    this.readyToSubmit = this.readyToSubmit !== true;
  }
}
