import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../classes/elective';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';

@Component({
  selector: 'iee-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {
  education: Education;
  electives: Elective[] = [];
  activeTabSession: string;
  activeProgramMajorId: string;

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    const params: URLSearchParams = (new URL(document.location.toString())).searchParams;
    // push the new education Id to the service and update the data
    this.electiveDataService.educationId.next(params.get('eid'));

    this.electiveDataService.education.asObservable().subscribe({
      next: data => {
        this.education = data;
        console.log(this.education);
        this.onChangeTab(0);
      }
    });
  }

  onChangeTab(index: number) {
    this.activeProgramMajorId = this.education.programMajorIds[index];
    this.activeTabSession = this.education.sessionsByProgramMajorIds[this.activeProgramMajorId];
    this.electives = this.education.electivesByProgramMajorIds[this.activeProgramMajorId];
  }
}
