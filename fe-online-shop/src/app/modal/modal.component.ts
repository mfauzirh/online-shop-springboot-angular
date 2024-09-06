import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() confirmButtonText?: string;
  @Output() confirm = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }
}
