import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { LeaveBalanceService } from '../../../core/services/leave-balance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  top10LeaveTakers = new MatTableDataSource<any>([]);
  top5NoPaidLeaves = new MatTableDataSource<any>([]);
  recent5Employees = new MatTableDataSource<any>([]);

  leaveTakersColumns: string[] = ['name', 'leaveCount'];
  noPaidLeavesColumns: string[] = ['name', 'email'];
  recentEmployeesColumns: string[] = ['name', 'email', 'joinDate'];

  constructor(private leaveBalance: LeaveBalanceService) {}

  ngOnInit() {
    this.loadAnalyticsData();
  }

  loadAnalyticsData() {
    this.leaveBalance.getTop10FrequentLeaveTakers().subscribe({
      next: (data) => {
        console.log(data)
        this.top10LeaveTakers.data = data;
      },
      error: (err) => {
        console.error('Error loading top 10 leave takers:', err);
      }
    });

    this.leaveBalance.getTop5EmployeesWithoutPaidLeaves().subscribe({
      next: (data) => {
        console.log(data)
        this.top5NoPaidLeaves.data = data;
      },
      error: (err) => {
        console.error('Error loading top 5 no paid leaves:', err);
      }
    });

    this.leaveBalance.getRecent5Employees().subscribe({
      next: (data) => {
        console.log(data)
        this.recent5Employees.data = data;
      },
      error: (err) => {
        console.error('Error loading recent 5 employees:', err);
      }
    });
  }

  logout() {
    // this.authService.logout();
  }
}