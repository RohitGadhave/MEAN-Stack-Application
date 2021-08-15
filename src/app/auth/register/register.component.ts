import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder ,FormControl} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required,Validators.email],
    password: ['', Validators.required],
    mobile: ['', Validators.required,Validators.maxLength(10)],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }
}
