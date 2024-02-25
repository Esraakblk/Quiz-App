import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { RegisterModel } from '../models/register-form.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _router: Router, private _loginService: LoginService, private _cdr: ChangeDetectorRef) { }
  registerForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email]),
      fullName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      password: new FormControl("", [Validators.required, Validators.minLength(4)]),
      passwordRepeat: new FormControl("", [Validators.required, Validators.minLength(4)]),
    },
  )

  ngOnInit() {
    this._formChange();
  }

  private _formChange() {
    this.registerForm.get("password")?.valueChanges.subscribe(data => {
      this.checkEqualsPassword();
    })
    this.registerForm.get("passwordRepeat")?.valueChanges.subscribe(data => {
      this.checkEqualsPassword();
    })
  }

  public getFormNameInvalid(formName: string): boolean | undefined {
    return this.registerForm.get(formName)?.invalid;
  }

  //Hata Mesajlarını döndürür!
  public getErrorMessage(formName: string): string {
    if (this._getRegisterForm(formName, "required")) {
      return 'Zorunlu alan!';
    } else if (this._getRegisterForm(formName, "minlength")) {
      return "Min karakter sayısını geçiniz!";
    } else if (this._getRegisterForm(formName, "email")) {
      return "Geçerli değer giriniz!";
    } else if (this._getRegisterForm(formName, "maxlength")) {
      return "Max karakter sayısını geçtiniz!";
    } else if (this._getRegisterForm(formName, "missmatch")) {
      return "Şifreler aynı değil!";
    }
    else return "";
  }

  //Error olup olmadığını kontrol eden dinamik yapı
  private _getRegisterForm(formName: string, errorType: string) {
    return this.registerForm.get(formName)?.hasError(errorType);
  }

  //Parolaların eşit olup olmadığını kontrol eder!
  checkEqualsPassword() {
    if (this.registerForm.get("password")?.value !== this.registerForm.get("passwordRepeat")?.value) {
      this.registerForm.get("password")?.setErrors({ missmatch: true })
      this.registerForm.get("passwordRepeat")?.setErrors({ missmatch: true });
      this.registerForm.updateValueAndValidity();
      this._cdr.detectChanges();
    } else {
      this.registerForm.get("password")?.setErrors(null)
      this.registerForm.get("passwordRepeat")?.setErrors(null);
      this.registerForm.updateValueAndValidity();
      this._cdr.detectChanges();
    }
  }

  isDisableForFormGroup(): boolean {
    return !this.registerForm.valid;
  }

  register() {
    const payload: RegisterModel | any = this.registerForm.value;
    this._loginService.register(payload);
    this._router.navigateByUrl("/login")
  }
}
