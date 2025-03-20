import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../../environments/environment';

export interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: string;
  employeeId: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createLeaveRequest(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.LEAVE_REQUESTS}`, request);
  }

  updateLeaveRequestStatus(id: string, update: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${API_ENDPOINTS.LEAVE_REQUESTS}/${id}`, update);
  }

  getAllLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}${API_ENDPOINTS.LEAVE_REQUESTS}`);
  }

  getLeaveRequestById(id: string): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.baseUrl}${API_ENDPOINTS.LEAVE_REQUESTS}/${id}`);
  }

  getLeaveRequestsByEmployeeId(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}${API_ENDPOINTS.LEAVE_REQUESTS}/employee`);
  }
}