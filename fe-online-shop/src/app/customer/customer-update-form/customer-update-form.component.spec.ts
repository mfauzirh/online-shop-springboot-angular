import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateFormComponent } from './customer-update-form.component';

describe('CustomerUpdateFormComponent', () => {
  let component: CustomerUpdateFormComponent;
  let fixture: ComponentFixture<CustomerUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
