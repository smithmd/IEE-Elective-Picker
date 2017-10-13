import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';
import {Elective} from '../classes/elective';

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit {
  private education: Education;
  private readyToSubmit: boolean = false;
  private primaryElectivesByProgramMajorIds: { [pm_id: string]: Elective[] } = {};
  private alternateElectivesByProgramMajorIds: { [pm_id: string]: Elective[] } = {};

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.education.subscribe({
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
}
