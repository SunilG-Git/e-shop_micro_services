import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //@ts-ignore
  formGroup: FormGroup;

  constructor(private authService:AuthServiceService) { }

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
