import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../shared/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const user: User = {
      userId: 0,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.dataService.loginUser(user).subscribe(
      response => {
        this.router.navigate(['/product-view']);
      },
      error => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
