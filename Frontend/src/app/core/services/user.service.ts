import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(user: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}${API_ENDPOINTS.USERS}`, user);
      }

    updateUser(id: string, user: any): Observable<any> {
        return this.http.put(`${API_ENDPOINTS.USERS}/${id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${API_ENDPOINTS.USERS}/${id}`);
    }

    findUser(id: string): Observable<any> {
        return this.http.get(`${API_ENDPOINTS.USERS}/${id}`);
    }
}