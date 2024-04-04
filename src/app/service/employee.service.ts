import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../employee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiBaseUrl = environment.apiBaseurl;

  constructor(private http: HttpClient) {}



  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employees`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(
  `${this.apiBaseUrl}/employees`,
   employee
  ).pipe(
  catchError((error) => {
  console.error(error);
  return throwError(error);
  })
  );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
  return this.http.put<Employee>(
  `${this.apiBaseUrl}/employees/${employee.id}`,
  employee
  ).pipe(
  catchError((error) => {
  console.error(error);
  return throwError(error);
  })
  );
  }

  deleteEmployee(employeeId: number): Observable<void> {
  return this.http.delete<void>(
  `${this.apiBaseUrl}/employees/${employeeId}`
  ).pipe(
  catchError((error) => {
  console.error(error);
  return throwError(error);
  })
  );
  }
}


//   public getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`);
//   }

//   public addEmployee(employee: Employee): Observable<Employee> {
//     return this.http.post<Employee>(
//       `${this.apiServerUrl}/employee/add`,
//       employee
//     ).pipe(
//       catchError((error) => {
//         console.error(error);
//         throw error;
//       })
//     );
//   }

//   public updateEmployee(employee: Employee): Observable<Employee> {
//     return this.http.put<Employee>(
//       `${this.apiServerUrl}/employee/update`,
//       employee
//     ).pipe(
//       catchError((error) => {
//         console.error(error);
//         throw error;
//       })
//     );
//   }

//   public deleteEmployee(employeeId: number): Observable<void> {
//     return this.http.delete<void>(
//       `${this.apiServerUrl}/employee/delete/${employeeId}`
//     ).pipe(
//       catchError((error) => {
//         console.error(error);
//         throw error;
//       })
//     );
//   }
// }
