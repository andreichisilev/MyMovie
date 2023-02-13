import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showServerError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [true],
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;
    const payload = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService.login(payload).subscribe({
      next: (res) => {
        window.localStorage['token'] = res.token;
        if (this.loginForm.value.remember)
          window.localStorage['rememberMe'] = this.loginForm.value.remember;
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.showServerError = true;
      },
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
