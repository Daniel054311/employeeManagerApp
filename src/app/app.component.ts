import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined | null;
  public deleteEmployee: Employee | null = null;
  public searchIterm: string = '';
  public filteredEmployees: Employee[] = [];


  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }
  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchIterm.toLowerCase())
    );
  }


  getEmployees(): void {
  this.employeeService.getEmployees().subscribe(employees => {
    this.employees = employees;
    this.filteredEmployees = [...this.employees];
  console.log(employees);
  });
  }

  public onAddEmployee(addForm: NgForm) {
  document.getElementById('addEmployeeForm')?.click();
  this.employeeService.addEmployee(addForm.value).subscribe(
  (response: Employee) => {
  console.log(response);
  this.getEmployees();
  addForm.reset();
  alert('Employee added successfully');
  },
  (error: HttpErrorResponse) => {
  alert(error.message);
  addForm.reset();
  }
  );
  }

  public onUpdateEmployee(employee: Employee) {
  this.employeeService.updateEmployee(employee).subscribe(
  (response: Employee) => {
  console.log(response);
  this.getEmployees();
  },
  (error: HttpErrorResponse) => {
  alert(error.message);
  }
  );
  }

  public onDeleteEmployee(employeeId: number) {
  this.employeeService.deleteEmployee(employeeId).subscribe(
  (response: void) => {
  console.log(response);
  alert('Employee deleted successfully');
  this.getEmployees();
  },
  (error: HttpErrorResponse) => {
  alert(error.message);
  }
  );
  }


  // public onDeleteEmployee(employeeId: number) {
  //   if (confirm('Are you sure you want to delete this employee?')) {
  //     this.employeeService.deleteEmployee(employeeId).subscribe(
  //       () => {
  //         console.log('Employee deleted successfully');
  //         // Optionally, you can reload the list of employees after deletion
  //         this.getEmployees();
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert('Failed to delete employee. ' + error.message);
  //       }
  //     );
  //   }
  // }


  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('mainContainer');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updtateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
