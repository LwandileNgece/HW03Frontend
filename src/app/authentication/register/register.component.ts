import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../shared/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.registerForm.invalid) {
      return;
    }

    const user: User = {
      userId: 0,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.dataService.registerUser(user).subscribe(
      response => {
        this.router.navigate(['/login']);
        alert('Registered successfully.');
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again later.';
      }
    );
  }
}
