import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EventBusService } from '../../../services/event-bus.service';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
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

    this.eventBusService.modalEvents$.subscribe(({ name, event }) => {
      if (event === 'action') {
        this.onModalAction(name);
      } else if (event === 'close') {
        this.onModalClose(name);
      }
    });
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

  onModalAction(name: string): void {
    console.log(`${name} modal action performed`);
  }
}