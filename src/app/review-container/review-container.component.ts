import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';
import {Elective} from '../classes/elective';
import {CriteriaCheckService} from '../criteria-check.service';
import {ElectiveCriterion} from '../classes/elective-criterion';

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit, OnDestroy, DoCheck {
  private education: Education;
  private readyToSubmit: boolean = false;
  private primaryElectivesByProgramMajorIds: { [pm_id: string]: Elective[] } = {};
  private alternateElectivesByProgramMajorIds: { [pm_id: string]: Elective[] } = {};
  private availableCriteriaByProgramMajorIds: { [pm_id: string]: number} = {};
  private electiveCriteria: Map<string, ElectiveCriterion[]> = new Map<string, ElectiveCriterion[]>();
  private _oldCriteriaSize: number = 0;
  private _oldPrimaryLength: number = 0;
  private _oldAlternateLength: number = 0;


  constructor(private electiveDataService: ElectiveDataService, private criteriaCheckService: CriteriaCheckService) {
  }

  ngDoCheck() {
    // if (this._oldCriteriaSize !== this.electiveCriteria.size || this._oldPrimaryLength !== this.primaryElectivesByProgramMajorIds) {
    //
    // }
  }

  ngOnInit() {
    this.electiveDataService.electiveCriteria.asObservable().subscribe( {
      next: c => {
        this.electiveCriteria = c;
      }
    });
    this.electiveDataService.education.asObservable().subscribe({
      next: ed => {
        this.education = ed;
        ed.programMajorIds.forEach(pmId => {
          this.primaryElectivesByProgramMajorIds[pmId] = ed.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isPrimary;
          });
          this.alternateElectivesByProgramMajorIds[pmId] = ed.electivesByProgramMajorIds[pmId].filter(e => {
            return e.isAlternate;
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.electiveDataService.electiveCriteria.unsubscribe();
    this.electiveDataService.education.unsubscribe();
  }
}
