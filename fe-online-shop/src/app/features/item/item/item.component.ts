import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EventBusService } from '../../../services/event-bus.service';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements AfterViewInit {
  @ViewChild('modal1') modal1!: ModalComponent;
  @ViewChild('modal2') modal2!: ModalComponent;

  constructor(private eventBusService: EventBusService) {}

  ngAfterViewInit() {
    this.eventBusService.modalActions$.subscribe(({ name, action }) => {
      if (name === 'Modal 1') {
        this.modal1.isOpen = action === 'open';
      } else if (name === 'Modal 2') {
        this.modal2.isOpen = action === 'open';
      }
    });

    this.eventBusService.modalEvents$.subscribe(({ name, event, payload }) => {
      if (event === 'action') {
        this.onModalAction(name, payload);
      } else if (event === 'close') {
        this.onModalClose(name);
      }
    });
  }

  openDeleteModal(id: number): void {
    this.modal1.payload = { id }; // Set the payload
    this.eventBusService.openModal('Modal 1');
  }

  openEditModal(id: number): void {
    this.modal2.payload = { id }; // Set the payload
    this.eventBusService.openModal('Modal 2');
  }

  openModal(name: string): void {
    this.eventBusService.openModal(name);
  }

  closeModal(name: string): void {
    this.eventBusService.closeModal(name);
  }

  onModalClose(name: string): void {
    console.log(`${name} modal closed`);
  }

  onModalAction(name: string, payload?: any): void {
    console.log(`${name} modal action performed with payload:`, payload);
    if (payload) {
      // Handle the payload (e.g., make an HTTP request with the ID)
      // Example: this.http.delete(`/api/items/${payload.id}`).subscribe();
    }
  }
}
