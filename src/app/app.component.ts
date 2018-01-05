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
    return !!(this.education && this.education.totalWeeksAttending && this.education.totalWeeksAttending >= 3
      && this.activeProgramMajorId !== null);
  }

  get privateLessonFormLink(): string {
    let queryString = '?';
    queryString += 'studentName[first]=' + encodeURI(this.education.studentFirstName);
    queryString += '&studentName[last]=' + encodeURI(this.education.studentLastName);
    queryString += '&emailAddress=' + encodeURI(this.education.currentUserEmail).replace(/\+/g, '{plusSign}');
    queryString += '&division=' + encodeURI(this.education.division);
    queryString += '&session=' + encodeURI(this.education.sessionsByProgramMajorIds[this.activeProgramMajorId]);

    const url = 'https://jotform.com/73405988648170';

    return url + queryString;
  }

  get privateLessonInstructions(): string {
    return '<p>A Private Lesson elective may be requested in the place of one of the elective selections made on this page.</p>' +
      '<p>To be eligible, the student must have at least three years of experience on the instrument in question, and ' +
      'there is an additional fee of $115 per week.</p>' +
      '<p>If you are interested in requesting a Private Lesson elective, ' +
      '<a class="privateLessonLink" href="\' + this.privateLessonFormLink + \'" target="_blank">please complete this form.</a></p>';
  }
}
