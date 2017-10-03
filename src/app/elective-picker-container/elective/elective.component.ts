import {Component, Input, OnInit} from '@angular/core';
import {Elective} from '../../classes/elective';
import {ElectiveDataService} from '../../elective-data-service';

declare const Visualforce: any;

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
  educationId: string;

  get isChecked(): boolean {
    return this.elective.isPrimary || this.elective.isAlternate;
  }

  constructor(private electiveDataService: ElectiveDataService) {
  }

  ngOnInit() {
    this.electiveDataService.educationId.subscribe({
      next: value => {
        this.educationId = value;
      }
    });
  }

  onCheckChange(isDisabled: boolean) {
    if (!isDisabled) {
      if (this.isPrimary === true) {
        this.elective.isPrimary = !this.elective.isPrimary;
      } else {
        this.elective.isAlternate = !this.elective.isAlternate;
      }

      if (this.isChecked) { // a little backwards because we've just checked it, so save to DB
        Visualforce.remoting.Manager.invokeAction(
          'IEE_ElectivePicker_Controller.insertElectiveChoiceCamp',
          this.educationId,
          this.elective.id,
          (this.elective.isPrimary ? true : false), // is this the primary choice or alternate
          this.elective.sessionId,
          (savedId: string) => {
            this.elective.courseRequestId = savedId;
          }
        );
      } else { // again... not checked means we just unchecked it so we'll delete it
        // TODO: Delete course request
        Visualforce.remoting.Manager.invokeAction(
          'IEE_ElectivePicker_Controller.deleteElectiveChoiceCamp',
          this.elective.courseRequestId,
          (saved: boolean) => {
            // I guess do something here?
            if (saved === true) {
              console.log('deleted ' + this.elective.courseDescription);
            }
          }
        );
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
