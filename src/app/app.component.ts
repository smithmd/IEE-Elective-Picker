import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from './elective-data-service';
import {Education} from './classes/education';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'iee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  education: Education;
  activeProgramMajorId: string;
  longDescription: string = '';

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    const edObs = this.electiveDataService.education.asObservable();
    const pmIdObs = this.electiveDataService.activeProgramMajorId.asObservable();

    Observable.combineLatest(edObs, pmIdObs).subscribe(o => {
      [this.education, this.activeProgramMajorId] = o;
      this.updateDescriptionText();
    });
  }

  updateDescriptionText() {
    if (!this.activeProgramMajorId || this.activeProgramMajorId === null) {
      // build list of all long descriptions
      this.education.programMajorIds.forEach(pmId => {
        this.longDescription += this.education.longDescriptionsByProgramMajorIds[pmId];
      });
    } else {
      this.longDescription = this.education.longDescriptionsByProgramMajorIds[this.activeProgramMajorId];
    }
  }
}
