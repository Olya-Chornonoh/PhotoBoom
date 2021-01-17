import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);
  login = new FormControl('', [
    Validators.required,
  ]);

  form: FormGroup;

  hidePassword = true;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: this.login,
      email: this.email,
      password: this.password,
    });
  }

  signUp() {
    const email = this.email.value.toString();
    const password = this.password.value.toString();
    const login = this.login.value.toString();

    this.api.register(email, login, password).subscribe(user => {
      console.log(user);
    });
  }

  signIn(){
    this.router.navigate(['/signin']);
  }
}
