import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/shared/interface/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: any = {};
  public logInFormModel: FormGroup;
  public error: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.logInFormModel = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
    //this._authService.setCurrentUserValue();
  }
  loginForm() {
    //console.table(this.logInFormModel);
    if (this.logInFormModel.status === 'INVALID') {
      return false;
    }
    let model: Login = {
      email: this.logInFormModel.value.email,
      password: this.logInFormModel.value.password
    }
    this.authService.login(model).subscribe((value) => {
      //console.log(JSON.stringify(value));
      //console.warn(this.authService.currentUserValue)
    }, (error) => {
      console.warn(JSON.stringify(error.error));
      this.error = error.error
    });

  }
  get Form() {
    //console.warn(this.logInFormModel.controls.email);
    return this.logInFormModel.controls;
  }
}
