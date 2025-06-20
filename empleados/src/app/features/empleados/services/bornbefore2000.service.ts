import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class BornBefore2000Service {
  private apiUrl = '/api/employees/born-before-2000';

  constructor(private http: HttpClient) { }

  getEmployeesBornBefore2000(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
