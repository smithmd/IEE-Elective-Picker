import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../elective';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../Education';

@Component({
  selector: 'iee-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {
  @Input() education: Education;
  electives: Elective[];
  activeTabSession: string;

  constructor(private electiveDataService: ElectiveDataService) {
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
  }

  ngOnInit() {
  }

  onChangeTab(index: number) {
    this.activeTabSession = this.education.sessions[index];
    this.electiveDataService.programMajorId.next(this.education.programMajorIds[index]);
  }
}
