import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  errors: string[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.errors = [];
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          console.log(error);
          if (error.error.statusCode === 401) {
            this.errors.push(
              'There was a problem logging in. Check your email and password or create an account.'
            );
          }
        },
      });
    }
  }
}
