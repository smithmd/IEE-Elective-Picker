import {Component, Input, OnInit} from '@angular/core';
import {ElectiveCriterion} from '../classes/elective-criterion';
import {ElectiveDataService} from '../elective-data-service';

@Component({
  selector: 'iee-elective-criteria-container',
  templateUrl: './elective-criteria-container.component.html',
  styleUrls: ['./elective-criteria-container.component.css']
})
export class ElectiveCriteriaContainerComponent implements OnInit {
  @Input() activeProgramMajorId: string;
  electiveCriteria: ElectiveCriterion[];

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.electiveCriteria.asObservable().subscribe({
      next: data => {
        if (data) {
          this.electiveCriteria = data[this.activeProgramMajorId];
          console.log(this.electiveCriteria);
        }
      }
    });
  }
}
