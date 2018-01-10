import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Elective} from '../classes/elective';

@Component({
  selector: 'iee-elective-picker-container',
  templateUrl: './elective-picker-container.component.html',
  styleUrls: ['./elective-picker-container.component.css']
})
export class ElectivePickerContainerComponent implements OnInit, DoCheck {
  electiveOptionsType = 'primary';
  private _oldTabIndex = 0;
  @Input() electives: Elective[];
  @Input() tabIndex: number;

  constructor() {
  }

  ngDoCheck(): void {
    if (this._oldTabIndex !== this.tabIndex) {
      this.electiveOptionsType = 'primary';
      this._oldTabIndex = this.tabIndex;
    }
  }

  ngOnInit() {
  }

  onClickTypeOption(type: string) {
    this.electiveOptionsType = type;
  }
}
