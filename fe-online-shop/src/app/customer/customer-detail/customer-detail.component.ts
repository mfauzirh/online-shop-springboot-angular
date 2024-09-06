import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface CustomerResponse {
  customerId: number;
  customerName: string;
  customerAddress: string;
  customerCode: string;
  customerPhone: string;
  isActive: boolean;
  lastOrderDate: string;
  pic: string;
}

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customer: CustomerResponse | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCustomer(id);
    }
  }

  fetchCustomer(id: string): void {
    this.http.get<any>(`http://localhost:8080/customers/${id}`)
      .subscribe(data => {
        console.log(data)
        this.customer = data.data;
      });
  }
}