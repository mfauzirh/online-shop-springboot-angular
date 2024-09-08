import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleteModalComponent } from './customer-delete-modal.component';

describe('CustomerDeleteModalComponent', () => {
  let component: CustomerDeleteModalComponent;
  let fixture: ComponentFixture<CustomerDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
