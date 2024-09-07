import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() name: string = '';
  @Input() isOpen = false;
  @Input() actionButtonText: string = 'Save changes';
  @Input() payload: any; // Added to receive payload
  @Output() close = new EventEmitter<void>();

  constructor(private eventBusService: EventBusService) {}

  ngOnInit() {
    this.eventBusService.modalActions$.subscribe(({ name, action }) => {
      if (name === this.name) {
        this.isOpen = action === 'open';
      }
    });
  }

  onClose(): void {
    this.isOpen = false;
    this.close.emit();
    this.eventBusService.publishModalAction(this.name, 'close');
  }

  onAction(): void {
    this.eventBusService.publishModalAction(this.name, 'action', this.payload);
    // this.onClose(); // Close modal after action if needed
  }
}
