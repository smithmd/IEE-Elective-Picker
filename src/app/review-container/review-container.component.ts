import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';
import {Elective} from '../classes/elective';
import {CriteriaCheckService} from '../criteria-check.service';
import {ElectiveCriterion} from '../classes/elective-criterion';
import 'rxjs/rx';

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit {
  education: Education;
  readyToSubmit: boolean = false;
  primaryElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  alternateElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  availableCriteriaByProgramMajorIds: Map<string, number> = new Map<string, number>();
  electiveCriteria: Map<string, ElectiveCriterion[]> = new Map<string, ElectiveCriterion[]>();

  constructor(private electiveDataService: ElectiveDataService, private criteriaCheckService: CriteriaCheckService) {
  }

  ngOnInit() {

    const electiveObs = this.electiveDataService.electiveCriteria.asObservable();
    const educationObs = this.electiveDataService.education.asObservable();

    const obs = electiveObs.combineLatest(educationObs,
      (elective, education) => {
        return {criteria: elective, education: education};
      });

    // combine observables so I know have both sets of data at once
    obs.subscribe((o) => {
      this.electiveCriteria = o.criteria;
      this.education = o.education;

      o.education.programMajorIds.forEach(pmId => {
        if (o.education.electivesByProgramMajorIds[pmId]) {
          this.primaryElectivesByProgramMajorIds.set(pmId, o.education.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isPrimary;
          }));
          this.alternateElectivesByProgramMajorIds.set(pmId, o.education.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isAlternate;
          }));
        } else {
          this.primaryElectivesByProgramMajorIds.set(pmId, []);
          this.alternateElectivesByProgramMajorIds.set(pmId, []);
        }

        if (o.criteria.get(pmId)) {
          const typeCriteria = o.criteria.get(pmId).filter(c => {
            return c.requirementType === 'type';
          });

          const primaryElectives = this.primaryElectivesByProgramMajorIds.get(pmId);

          const criteriaMap = this.criteriaCheckService.buildCriteriaMap(typeCriteria);
          this.criteriaCheckService.checkCriteriaCheckMarks(typeCriteria, primaryElectives, criteriaMap);

          this.availableCriteriaByProgramMajorIds.set(pmId,
            this.criteriaCheckService.countAvailableCriteria(typeCriteria, false));
        }
      });
    });
  }

  onSubmit() {
    console.log('clicked submit');
  }

  onClickCheckbox() {
    this.readyToSubmit = this.readyToSubmit !== true;
  }
}
