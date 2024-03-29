import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { RegisterModel } from '../models/register-form.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private _router: Router, private _loginService: LoginService) { }
  isLogin: boolean = false;
  loginForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    },
  )

  login() {
    const users: RegisterModel[] = this._loginService.getUsers();
    users.forEach(user => {
      if (user.email === this.loginForm.get("email")?.value && user.password === this.loginForm.get("password")?.value) {
        this._loginService.login(this.loginForm.value);
        this.isLogin = true;
        this._router.navigateByUrl("/quiz");
      }
    })
    if (!this.isLogin) {
      window.alert("Böyle bir kullanıcı bulunamadı!")
    }
    this.isLogin = false;
  }

  //Yönlendirme yapılan yer
  goToRegister() {
    this._router.navigateByUrl("/register")
  }

  isDisableForFormGroup(): boolean {
    return !this.loginForm.valid;
  }

}
