import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const currentUser = authService.currentUserSubject.value;
    if (!currentUser) {
        router.navigate(['/login']);
        return false;
    }

    if (route.data['sub'] === 'admin' && !authService.isAdmin()) {
        router.navigate(['/admin/dashboard']);
        return false;
    }
    return true;
};