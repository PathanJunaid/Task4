import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.apiUrl;
    public currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    private router = inject(Router);
    constructor(private http: HttpClient) {
        this.restoreUserFromToken(); // Check token on initialization
    }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}${API_ENDPOINTS.USERS}/login`, credentials);
    }

    signup(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}${API_ENDPOINTS.USERS}`, user);
    }

    setCurrentUser(user: any) {
        localStorage.setItem('token', user.jwt);
        this.currentUserSubject.next(user);
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user?.sub === 'Admin';
    }

    // Restore user state from token on app load
    private restoreUserFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            // Option 1: Decode JWT locally (if you don’t need server validation)
            const user = this.decodeToken(token);
            if (user && !this.isTokenExpired(user.exp)) {
                this.currentUserSubject.next(user);
            } else {
                this.logout(); // Clear invalid/expired token
            }
        }
    }

    // Helper to decode JWT (simple implementation)
    private decodeToken(token: string): any {
        try {
            const payload = token.split('.')[1];
            const decoded = atob(payload);
            return JSON.parse(decoded);
        } catch (e) {
            return null;
        }
    }

    // Check if token is expired
    private isTokenExpired(exp: number): boolean {
        return Date.now() >= exp * 1000; // Convert seconds to milliseconds
    }
}