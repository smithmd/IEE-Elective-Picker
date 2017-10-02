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
  electives: Elective[];
  activeTabSession: string;

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.electiveList.asObservable().subscribe({
      next: data => {
        this.electives = data.sort(
          (a: Elective, b: Elective) => {
            const aVal = a.startPeriod + a.courseNumber + a.section;
            const bVal = b.startPeriod + b.courseNumber + b.section;
            return aVal.localeCompare(bVal);
          }
        );
      }
    });

    const params: URLSearchParams = (new URL(document.location.toString())).searchParams;
    // push the new education Id to the service and update the data
    this.electiveDataService.educationId.next(params.get('eid'));

    this.electiveDataService.education.asObservable().subscribe({
      next: data => {
        this.education = data;
        this.onChangeTab(0);
      }
    });
  }

  onChangeTab(index: number) {
    this.activeTabSession = this.education.sessions[index];
    this.electiveDataService.programMajorId.next(this.education.programMajorIds[index]);
  }
}
