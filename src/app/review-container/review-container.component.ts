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
  private education: Education;
  // private readyToSubmit: boolean = false;
  private primaryElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  private alternateElectivesByProgramMajorIds: Map<string, Elective[]> = new Map<string, Elective[]>();
  private availableCriteriaByProgramMajorIds: Map<string, number> = new Map<string, number>();
  private electiveCriteria: Map<string, ElectiveCriterion[]> = new Map<string, ElectiveCriterion[]>();

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
        this.primaryElectivesByProgramMajorIds.set(pmId, o.education.electivesByProgramMajorIds[pmId].filter(e => {
          return e.isPrimary;
        }));
        this.alternateElectivesByProgramMajorIds.set(pmId, o.education.electivesByProgramMajorIds[pmId].filter(e => {
          return e.isAlternate;
        }));

        if (o.criteria.get(pmId)) {
          this.availableCriteriaByProgramMajorIds.set(pmId,
            this.criteriaCheckService.countAvailableCriteria(
              o.criteria.get(pmId).filter(c => { return c.requirementType === 'type'; }), false
            ));
        }
      });
    });
  }
}
