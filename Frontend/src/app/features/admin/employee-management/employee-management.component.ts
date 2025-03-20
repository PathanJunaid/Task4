import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  selector: 'app-employee-management',
  template: `
    <div class="employee-management">
      <button mat-raised-button color="primary" routerLink="/signup">Add New Employee</button>
      <table mat-table [dataSource]="employees" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let employee">{{employee.name}}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let employee">{{employee.email}}</td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Role</th>
          <td mat-cell *matCellDef="let employee">{{employee.role}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let employee">
            <button mat-raised-button color="warn" (click)="deleteEmployee(employee.id)">Delete</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .employee-management {
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
      border-radius: 10px;
      overflow: hidden;
    }
    button {
      margin-bottom: 20px;
    }
  `]
})
export class EmployeeManagementComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'actions'];
  employees: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.userService.findUser('all').subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error(err)
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error(err)
      });
    }
  }
}