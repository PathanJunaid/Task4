import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Add datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // Required for datepicker
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule, // Add datepicker module
    MatNativeDateModule  // Add native date module
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ],
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent {
  private fb = inject(FormBuilder);
  private leaveRequestService = inject(LeaveRequestService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  leaveForm = this.fb.group({
    startDate: [new Date(), Validators.required], // Default to today
    endDate: [new Date(), Validators.required],   // Default to today
    leaveType: ['', Validators.required],
    reason: ['', Validators.required]
  });

  loading = false;

  onSubmit() {
    if (this.leaveForm.valid) {
      this.loading = true;
      this.leaveRequestService.createLeaveRequest(this.leaveForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.showSuccessPopup('Leave request submitted successfully');
          this.leaveForm.reset({ startDate: new Date(), endDate: new Date() });
          this.router.navigate(['/leave-requests']); // Already correct
        },
        error: (err) => {
          this.loading = false;
          this.showErrorPopup(err.error?.message || 'Failed to submit leave request.');
        }
      });
    }
  }

  private showSuccessPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}