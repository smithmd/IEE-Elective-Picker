import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../elective';

@Component({
  selector: 'iee-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {
  @Input() electives: Elective[];

  constructor() { }

  ngOnInit() {
  }

}
