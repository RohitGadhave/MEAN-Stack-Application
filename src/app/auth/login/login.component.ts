import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: any = {};
public logInFormModel:FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.logInFormModel= new FormGroup({
      'email': new FormControl(null,Validators.email),
      'password': new FormControl(null)
    });
  }
  loginForm() {
    console.table(this.logInFormModel);
  }
  
}
