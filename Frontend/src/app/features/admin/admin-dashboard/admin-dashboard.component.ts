import { Component, OnInit, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LeaveRequestService, LeaveRequest } from '../../../core/services/leave-request.service';
import { LeaveBalanceService } from '../../../core/services/leave-balance.service';
import { UserService } from '../../../core/services/user.service'; // Assume this exists
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { LeaveBalance } from '../../../shared/models/leave-balance.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private leaveRequestService = inject(LeaveRequestService);
  private leaveBalanceService = inject(LeaveBalanceService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  isFilterDisabled = true; // Add this property

  // Pending Requests
  pendingRequests: LeaveRequest[] = [];
  pendingColumns: string[] = ['employeeName', 'startDate', 'endDate', 'leaveType', 'reason', 'actions'];
  filterForm = this.fb.group({ status: ['Pending'] });
  loadingPending = false;

  // Analytics
  topFrequent: any[] = [];
  topNoPaid: any[] = [];
  recentEmployees: any[] = [];
  loadingAnalytics = false;

  // Employee Management
  allLeaveBalances: LeaveBalance[] = [];
  employeeColumns: string[] = ['name', 'email', 'paidLeaves', 'unpaidLeaves', 'sickLeaves'];
  addEmployeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  loadingEmployees = false;

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.showError('Access denied. Admins only.');
      return;
    }
    this.loadPendingRequests();
  }

  // Pending Requests
  loadPendingRequests() {
    this.loadingPending = true;
    this.leaveRequestService.getAllLeaveRequests().subscribe({
      next: (requests) => {
        console.log(requests)
        this.pendingRequests = requests.filter(r => r.status === 'Pending');
        this.loadingPending = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loadingPending = false;
        this.showError('Failed to load pending requests.');
      }
    });
  }

  updateRequestStatus(id: string, status: 1 | 2) {
    this.leaveRequestService.updateLeaveRequestStatus(id, { status }).subscribe({
      next: () => {
        this.showSuccess(`Request ${status === 1 ? 'approved' : 'rejected'} successfully.`);
        this.loadPendingRequests(); // Refresh list
      },
      error: () => {
        this.showSuccess(`Request ${status === 1 ? 'approved' : 'rejected'} successfully.`);
        this.loadPendingRequests(); // Refresh list
      }

    });
  }


  // Utils
  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }
}