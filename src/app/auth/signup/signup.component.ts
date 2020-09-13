import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    this.maxDate = today;
  }

  submitForm(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
      birthdate: f.value.date
    });
  }

  isAboveMax(val: any) {
    const date = new Date(val);
    return date.getTime() > this.maxDate.getTime();
  }
}
