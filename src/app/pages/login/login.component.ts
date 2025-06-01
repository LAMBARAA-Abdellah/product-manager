import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  success = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    if (this.auth.login(this.email, this.password)) {
      this.success = 'Connexion réussie !';
      this.error = '';

      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          location.reload(); // ✅ force AuthGuard à relire localStorage
        });
      }, 1000);
    } else {
      this.success = '';
      this.error = 'Identifiants incorrects.';
    }
  }
}
