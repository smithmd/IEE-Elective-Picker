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

  get isChecked(): boolean {
    return this.elective.isPrimary || this.elective.isAlternate;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onCheckChange(value) {
    if (this.isPrimary === true) {
      this.elective.isPrimary = value;
    } else {
      this.elective.isAlternate = value;
    }
  }

  isPreviousTimeDifferent(): boolean {
    if (this.index > 0) {
      if (this.elective.period !== this.electives[this.index - 1].period) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }
}
