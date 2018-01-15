import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'iee-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @Input() detailText: string;
  @ViewChild('modalBackdrop') modalBackdrop: any;

  constructor() {
  }

  ngOnInit() {
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);

    this.modalBackdrop.nativeElement.style.height = viewHeight;
    this.modalBackdrop.nativeElement.style.width = viewWidth;
  }

  ngOnDestroy() {
    this.modalBackdrop.nativeElement.style.height = 0;
    this.modalBackdrop.nativeElement.style.width = 0;
  }
}
