import {Component, Input, OnInit} from '@angular/core';
import {ElectiveCriterion} from '../classes/elective-criterion';
import {ElectiveDataService} from '../elective-data-service';
import {Elective} from "../classes/elective";
import {Education} from "../classes/education";

@Component({
  selector: 'iee-elective-criteria-container',
  templateUrl: './elective-criteria-container.component.html',
  styleUrls: ['./elective-criteria-container.component.less']
})
export class ElectiveCriteriaContainerComponent implements OnInit {
  @Input() activeProgramMajorId: string;
  criteriaComplete: boolean[] = [];
  electives: Elective[] = [];
  periodCriteria: ElectiveCriterion[] = [];
  typeCriteria: ElectiveCriterion[] = [];

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.electiveCriteria.asObservable().subscribe({
      next: data => {
        if (data) {
          this.typeCriteria = data[this.activeProgramMajorId].filter(criterion => {
            return criterion.requirementType === 'type';
          });
          for (let i = 0; i < this.typeCriteria.length; i++) {
            this.criteriaComplete[i] = false;
          }

          this.periodCriteria = data[this.activeProgramMajorId].filter(criterion => {
            return criterion.requirementType === 'period';
          });
        }
      }
    });

    this.electiveDataService.education.asObservable().subscribe({
      next: data => {
        this.electives = data.electivesByProgramMajorIds[this.activeProgramMajorId];
      }
    });
  }
}
