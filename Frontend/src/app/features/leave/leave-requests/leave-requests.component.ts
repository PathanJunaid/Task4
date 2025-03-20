import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LeaveRequestService, LeaveRequest } from '../../../core/services/leave-request.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIconModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss']
})
export class LeaveRequestsComponent implements OnInit {
  private leaveRequestService = inject(LeaveRequestService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['startDate', 'endDate', 'leaveType', 'reason', 'status'];
  leaveRequests: LeaveRequest[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadLeaveRequests();
  }

  private loadLeaveRequests() {
    this.loading = true;
    const user = this.authService.currentUserSubject.value;

    if (!user) {
      this.loading = false;
      this.error = 'Please log in to view leave requests.';
      this.showError(this.error);
      return;
    }

    const observable = this.authService.isAdmin()
      ? this.leaveRequestService.getAllLeaveRequests()
      : this.leaveRequestService.getLeaveRequestsByEmployeeId();

    observable.subscribe({
      next: (requests) => {
        this.loading = false;
        this.leaveRequests = requests || []; // Ensure empty array if null
        if (this.leaveRequests.length === 0) {
          this.showInfo('No leave requests found.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 404) {
          // Handle 404 specifically
          this.leaveRequests = [];
          this.error = err.error?.message || 'No leave requests found for this employee.';
          this.showInfo(this.error ? this.error : 'No leave requests found for this employee.');
        } else {
          this.error = 'Failed to load leave requests. Please try again.';
          this.showError(this.error);
        }
      }
    });
  }
  retry() {
    this.loadLeaveRequests(); // Retry fetching requests
  }
  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private showInfo(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }
}