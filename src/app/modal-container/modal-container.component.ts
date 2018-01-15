import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'iee-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  detailText: string;
  @ViewChild('modalBackdrop') modalBackdrop: any;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);

    this.modalBackdrop.nativeElement.style.height = viewHeight;
    this.modalBackdrop.nativeElement.style.width = viewWidth;

    this.modalService.modalContent.asObservable().subscribe({
      next: text => {
        this.detailText = text;
      }
    });
  }

  ngOnDestroy() {
    this.modalBackdrop.nativeElement.style.height = 0;
    this.modalBackdrop.nativeElement.style.width = 0;
  }

  closeModal() {
    this.modalService.modalContent.next('');
    this.modalService.modalVisible.next(false);
  }
}
