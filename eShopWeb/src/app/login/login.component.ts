import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //@ts-ignore
  formGroup: FormGroup;

   //@ts-ignore
  formGroup = new FormGroup ({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })
  get username(){
    return this.formGroup.get('username')
  }
  get password(){
    return this.formGroup.get('password')
  }

  authenticationRequest:any={
    "username":"",
    "password":"",
  };

  surveyForm!: FormGroup;
  submitted= false;

  response:any;

  //*this is for declaring toggle password 
  public showPassword: boolean = false;

  constructor(private authService:AuthServiceService,private formBuilder : FormBuilder,private router:Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.formGroup =new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result => {
        if(result.true){
          console.log(result);
        }else {
          console.log(result)
        }
      });
    }
  }
}
