import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from './elective-data-service';
import {Education} from './Education';

@Component({
  selector: 'iee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  education: Education = new Education();

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    const params: URLSearchParams = (new URL(document.location.toString())).searchParams;
    // push the new education Id to the service and update the data
    this.electiveDataService.educationId.next(params.get('eid'));

    this.electiveDataService.education.asObservable().subscribe({
      next: data => {
        this.education = data;
      }
    });
  }
}
