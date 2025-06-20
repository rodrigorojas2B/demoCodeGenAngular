import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/api/employees';

  constructor(private http: HttpClient) { }

  deleteEmployee(id: string): Observable<{}> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return throwError('Employee not found');
        }
        return throwError(err);
      }),
      switchMap(employee => {
        if (employee.gender === 'Femenino') {
          return throwError('Cannot delete female employees');
        }
        return this.http.delete(`${this.apiUrl}/${id}`);
      })
    );
  }
}
