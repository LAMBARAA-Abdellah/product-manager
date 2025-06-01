import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly key = 'isLoggedIn';

    isLoggedIn(): boolean {
        return typeof window !== 'undefined' && localStorage.getItem(this.key) === 'true';
    }

    login(email: string, password: string): boolean {
        if (email === 'admin@ocpgroup.ma' && password === 'password') {
            localStorage.setItem(this.key, 'true');
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.key);
    }
}
