import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddFormComponent } from './customer-add-form.component';

describe('CustomerAddFormComponent', () => {
  let component: CustomerAddFormComponent;
  let fixture: ComponentFixture<CustomerAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
