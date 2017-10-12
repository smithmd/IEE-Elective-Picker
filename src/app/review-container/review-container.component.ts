import { Component, OnInit } from '@angular/core';
import {ElectiveDataService} from '../elective-data-service';
import {Education} from '../classes/education';

@Component({
  selector: 'iee-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent implements OnInit {
  private education: Education;
  private complete: boolean = false;

  constructor(private electiveDataService: ElectiveDataService) { }

  ngOnInit() {
    this.electiveDataService.education.subscribe({
      next: ed => {
        this.education = ed;
      }
    });
  }
}
