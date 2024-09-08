import { Component, EventEmitter, Output } from '@angular/core';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-delete-modal',
  templateUrl: './item-delete-modal.component.html',
  styleUrl: './item-delete-modal.component.css'
})
export class ItemDeleteModalComponent {
  isOpen: boolean = false;
  itemId : number | undefined;
  
  @Output() itemDeleted = new EventEmitter<number>();

  constructor(private itemService: ItemService) {}

  // Assign item id when modal is open
  openModal(itemId: number) {
    if(itemId) {
      this.itemId = itemId;
      this.isOpen = true;
    }
  }

  // Set default item id when modal is closed
  closeModal() {
    this.itemId = undefined;
    this.isOpen = false;
  }

  // When delete executed, make request, then trigger item deleted event 
  // item component will react and re-fetch the new data
  onDelete() {
    if (!this.itemId) {
      console.error("Item id not set yet")
      return;
    }

    this.itemService.deleteItem(this.itemId!).subscribe({
      next: response => {
        console.log(response)
        console.log("Sucess deleted item");
        this.closeModal();
        this.itemDeleted.emit();
      },
      error: error => {
        console.log("Error fetching items", error)
      }
    })
  }
}
