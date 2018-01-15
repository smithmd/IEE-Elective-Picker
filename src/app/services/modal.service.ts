import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ModalService {
  public modalVisible = new BehaviorSubject<boolean>(false);
  public modalContent = new BehaviorSubject<string>(null);

  constructor() {
  }

}
