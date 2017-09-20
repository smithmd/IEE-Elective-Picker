import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from './elective-data-service';
import {Elective} from './elective';

@Component({
  selector: 'iee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  electives: Elective[];

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.electiveList.asObservable().subscribe({
      next: data => {
        this.electives = data;
      }
    });
  }
}
