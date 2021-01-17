import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);

  form: FormGroup;

  hidePassword = true;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  signIn() {
    const email = this.email.value.toString();
    const password = this.password.value.toString();

    this.auth.signIn(email, password).subscribe(accessToken => {
      this.auth.setAccessToken(accessToken);
      this.router.navigate(['/']);
    });
  }

  signUp(){
    this.router.navigate(['/signup']);
  }
}
