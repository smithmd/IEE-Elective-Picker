import {Component, Input, OnInit} from '@angular/core';
import {ElectiveCriterion} from '../classes/elective-criterion';
import {ElectiveDataService} from '../elective-data-service';

@Component({
  selector: 'iee-elective-criteria-container',
  templateUrl: './elective-criteria-container.component.html',
  styleUrls: ['./elective-criteria-container.component.less']
})
export class ElectiveCriteriaContainerComponent implements OnInit {
  @Input() activeProgramMajorId: string;
  electiveCriteria: ElectiveCriterion[];
  criteriaComplete: boolean[] = [];

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.electiveCriteria.asObservable().subscribe({
      next: data => {
        if (data) {
          this.electiveCriteria = data[this.activeProgramMajorId];
          console.log(this.electiveCriteria);
          for (let i = 0; i < this.electiveCriteria.length; i++) {
            this.criteriaComplete[i] = false;
          }
        }
      }
    });
  }
}
