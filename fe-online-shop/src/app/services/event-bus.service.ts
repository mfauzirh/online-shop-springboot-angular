// event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  // Modal related subjects
  private modalActions = new Subject<{ name: string, action: 'open' | 'close' }>();
  private modalEvents = new Subject<{ name: string, event: 'open' | 'close' | 'action', payload?: any }>();

  // Customer related subjects
  private customerActions = new Subject<{ action: 'add' | 'edit' | 'delete' | 'view', payload?: any }>();

  // Observables for external use
  modalActions$ = this.modalActions.asObservable();
  modalEvents$ = this.modalEvents.asObservable();
  customerActions$ = this.customerActions.asObservable();

  // Modal methods
  openModal(name: string) {
    this.modalActions.next({ name, action: 'open' });
  }

  closeModal(name: string) {
    this.modalActions.next({ name, action: 'close' });
  }

  publishModalAction(name: string, event: 'open' | 'close' | 'action', payload?: any) {
    this.modalEvents.next({ name, event, payload });
  }

  // Customer methods
  addCustomer(payload: any) {
    this.customerActions.next({ action: 'add', payload });
  }

  editCustomer(payload: any) {
    this.customerActions.next({ action: 'edit', payload });
  }

  deleteCustomer(payload: any) {
    this.customerActions.next({ action: 'delete', payload });
  }

  viewCustomer(payload: any) {
    this.customerActions.next({ action: 'view', payload });
  }
}
