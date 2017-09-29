import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../elective';

@Component({
  selector: 'iee-elective',
  templateUrl: './elective.component.html',
  styleUrls: ['./elective.component.css']
})
export class ElectiveComponent implements OnInit {
  @Input() elective: Elective;
  @Input() isPrimary: boolean;
  @Input() isDisabled: boolean;
  @Input() index: number;
  @Input() electives: Elective[];
  @Input() displayTimeHeaders = false;

  get isChecked(): boolean {
    return this.elective.isPrimary || this.elective.isAlternate;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onCheckChange(isDisabled: boolean) {
    if (!isDisabled) {
      if (this.isPrimary === true) {
        this.elective.isPrimary = !this.elective.isPrimary;
      } else {
        this.elective.isAlternate = !this.elective.isAlternate;
      }
    }
  }

  isPreviousTimeDifferent(): boolean {
    if (this.index > 0) {
      if (this.elective.startPeriod !== this.electives[this.index - 1].startPeriod) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }
}
