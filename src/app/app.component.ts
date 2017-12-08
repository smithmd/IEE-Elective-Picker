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
  longDescription = '';

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    const edObs = this.electiveDataService.education.asObservable();
    const pmIdObs = this.electiveDataService.activeProgramMajorId.asObservable();

    Observable.combineLatest(edObs, pmIdObs).subscribe(obs => {
      [this.education, this.activeProgramMajorId] = obs;
      this.updateDescriptionText();
    });
  }

  updateDescriptionText() {
    if (!this.activeProgramMajorId || this.activeProgramMajorId === null) {
      // build list of all long descriptions
      this.longDescription = '';
      // put default text at beginning? Should probably be stored on SFDC somewhere for easy updating

      const descriptionSet: Set<string> = new Set<string>();

      this.education.programMajorIds.forEach((pmId, index, array) => {
        descriptionSet.add(this.education.longDescriptionsByProgramMajorIds[pmId]);
      });

      Array.from(descriptionSet).forEach((description, index, array) => {
        this.longDescription += description;

        if (index < array.length - 1) {
          this.longDescription += '<hr />';
        }
      });
    } else {
      this.longDescription = this.education.longDescriptionsByProgramMajorIds[this.activeProgramMajorId];
    }
  }

  get showPrivateLessonInstructions(): boolean {
    // The !! is to force returning a boolean. Should never return the totalWeeks, which is a number type.
    return !!(this.education && this.education.totalWeeks && this.education.totalWeeks >= 3);
  }
}
