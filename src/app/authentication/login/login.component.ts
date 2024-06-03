import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Check if there's a message in the router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['message']) {
      this.successMessage = navigation.extras.state['message'];
    }
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark all controls as touched to trigger validation messages
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

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
