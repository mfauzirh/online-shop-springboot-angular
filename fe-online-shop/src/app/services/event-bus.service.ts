import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private modalActions = new Subject<{ name: string, action: 'open' | 'close' }>();
  private modalEvents = new Subject<{ name: string, event: 'open' | 'close' | 'action' }>();

  modalActions$ = this.modalActions.asObservable();
  modalEvents$ = this.modalEvents.asObservable();

  openModal(name: string) {
    this.modalActions.next({ name, action: 'open' });
  }

  closeModal(name: string) {
    this.modalActions.next({ name, action: 'close' });
  }

  publishModalAction(name: string, event: 'open' | 'close' | 'action') {
    this.modalEvents.next({ name, event });
  }
}
