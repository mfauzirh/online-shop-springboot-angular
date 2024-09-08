import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeleteModalComponent } from './order-delete-modal.component';

describe('OrderDeleteModalComponent', () => {
  let component: OrderDeleteModalComponent;
  let fixture: ComponentFixture<OrderDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
