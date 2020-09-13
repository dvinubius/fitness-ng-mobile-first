import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email] // sync validators
      ],
      password: [
        '',
        [Validators.required], // sync validator
      ]
    });
  }

  submitForm() {
    this.auth.login(this.loginForm.value).subscribe(
      authenticated => {
        if (!authenticated) {
          const passwordCtrl = this.loginForm.get('password');
          passwordCtrl.setErrors({incorrectPassword: true});
          passwordCtrl.markAsTouched();
        }
      }
    );
  }
}
