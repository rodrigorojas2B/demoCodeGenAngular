import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class OrderByPositionService {
  private apiUrl = '/api/employees/order-by-position';

  constructor(private http: HttpClient) { }

  getEmployeesOrderByPosition(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
