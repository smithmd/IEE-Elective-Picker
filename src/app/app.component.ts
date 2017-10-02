import {Component, OnInit} from '@angular/core';
import {ElectiveDataService} from './elective-data-service';
import {Education} from './classes/education';

@Component({
  selector: 'iee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
