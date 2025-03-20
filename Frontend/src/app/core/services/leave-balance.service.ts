import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../../environments/environment'; // Import environment
import { LeaveBalance } from '../../shared/models/leave-balance.model';

@Injectable({
    providedIn: 'root'
})
export class LeaveBalanceService {
    private baseUrl = environment.apiUrl; // Use base URL from environment

    constructor(private http: HttpClient) { }

    getTop10FrequentLeaveTakers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}${API_ENDPOINTS.ANALYTICS}/top10-frequent-leave-takers`);
    }

    getTop5EmployeesWithoutPaidLeaves(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}${API_ENDPOINTS.ANALYTICS}/top5-no-paid-leaves`);
    }

    getRecent5Employees(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}${API_ENDPOINTS.ANALYTICS}/recent5-employees`);
    }
}