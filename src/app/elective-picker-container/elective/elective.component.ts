import {
  AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, Renderer2,
  ViewChild
} from '@angular/core';
import {Elective} from '../../classes/elective';
import {ElectiveDataService} from '../../elective-data-service';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare const Visualforce: any;

@Component({
  selector: 'iee-elective',
  templateUrl: './elective.component.html',
  styleUrls: ['./elective.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition(':leave', [
        style({height: '*'}),
        animate('250ms 0ms ease-in-out', style({height: 0}))
      ]),
      transition(':enter', [
        style({height: 0}),
        animate('250ms 0ms ease-in-out', style({height: '*'}))
      ])
    ])
  ]
})
export class ElectiveComponent implements OnInit, AfterViewInit, DoCheck, OnChanges {
  @Input() elective: Elective;
  @Input() isPrimary: boolean;
  @Input() isDisabled: boolean;
  @Input() index: number;
  @Input() displayTimeHeaders: boolean;
  @Input() electives: Elective[];
  @Input() coRequisite: Elective;
  @Input() isDisplayed: boolean;
  educationId: string;
  endAnimation: Function;
  @ViewChild('availableSlotsElement') availableSlotsElement;
  private _previousAvailableSlots: number;

  get isChecked(): boolean {
    return this.elective.isPrimary || this.elective.isAlternate;
  }

  constructor(private electiveDataService: ElectiveDataService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.electiveDataService.educationId.asObservable().subscribe({
      next: value => {
        this.educationId = value;
      }
    });
    this._previousAvailableSlots = this.elective.availableSlots;
  }

  ngAfterViewInit() {
    if (this.isPrimary && this.availableSlotsElement) {
      this.endAnimation = this.renderer.listen(this.availableSlotsElement.nativeElement, 'animationend', evt => {
        this.availableSlotsElement.nativeElement.classList.remove('bouncer');
      });
    }
  }

  ngDoCheck() {
    if (this.isPrimary && this.availableSlotsElement && this.elective.availableSlots !== this._previousAvailableSlots) {
      this.availableSlotsElement.nativeElement.classList.add('bouncer');
      this._previousAvailableSlots = this.elective.availableSlots;
    }
  }

  ngOnChanges() {
    if (this.isPrimary && this.availableSlotsElement && this.elective.availableSlots !== this._previousAvailableSlots) {
      this.availableSlotsElement.nativeElement.classList.add('bouncer');
      this._previousAvailableSlots = this.elective.availableSlots;
    }
  }

  onCheckChange(isDisabled: boolean) {
    if (!isDisabled) {
      if (this.isPrimary === true) {
        this.elective.isPrimary = !this.elective.isPrimary;
        this.elective.isUpdating = true;
        if (this.coRequisite) {
          this.coRequisite.isPrimary = !this.coRequisite.isPrimary;
          this.coRequisite.isUpdating = true;
        }
      } else {
        this.elective.isAlternate = !this.elective.isAlternate;
        if (this.coRequisite) {
          this.coRequisite.isAlternate = !this.coRequisite.isAlternate;
        }
      }

      if (this.isChecked) { // a little backwards because we've just checked it, so save to DB
        this.elective.insertIntoSalesforce(this.educationId).then(result => {
          // if co-req exists, insert it also
          if (this.coRequisite) {
            this.coRequisite.insertIntoSalesforce(this.educationId).then(coReqResult => {});
          }
        });
      } else { // again... not checked means we just unchecked it so we'll delete it
        this.elective.deleteFromSalesforce().then(result => {
          // if co-req exists, delete it also
          if (this.coRequisite) {
            this.coRequisite.deleteFromSalesforce().then(coReqResult => {});
          }
        })
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
