import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit {
  private education: Education;
  private readyToSubmit: boolean = false;
  private hasPrimaryElectivesByPMId: { [pm_id: string]: boolean } = {};
  private hasAlternateElectivesByPMId: { [pm_id: string]: boolean } = {};

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.education.subscribe({
      next: ed => {
        this.education = ed;
        ed.programMajorIds.forEach(pmId => {
          this.hasPrimaryElectivesByPMId[pmId] = ed.electivesByProgramMajorIds[pmId].reduce((value, e) => {
            return value || e.isPrimary;
          }, false);

          this.hasAlternateElectivesByPMId[pmId] = ed.electivesByProgramMajorIds[pmId].reduce((value, e) => {
            return value || e.isAlternate;
          }, false);
        });
      }
    });
  }
}
