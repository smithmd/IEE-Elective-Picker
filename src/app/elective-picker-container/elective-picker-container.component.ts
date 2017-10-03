import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../classes/elective';

@Component({
  selector: 'iee-elective-picker-container',
  templateUrl: './elective-picker-container.component.html',
  styleUrls: ['./elective-picker-container.component.css']
})
export class ElectivePickerContainerComponent implements OnInit {
  electiveOptionsType = 'primary';
  @Input() electives: Elective[];
  @Input() programName: string;

  constructor() {
  }

  ngOnInit() {
  }

  onClickTypeOption(type: string) {
    this.electiveOptionsType = type;
  }
}
