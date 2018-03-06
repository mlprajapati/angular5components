import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Users } from './users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   //Component properties
   user: Users[];
   statusCode: number;
   requestProcessing = false;
   processValidation = false;
   returnUrl: string;
   //Create form
   loginForm = new FormGroup({
       username: new FormControl('', Validators.required),
       password: new FormControl('', Validators.required)	   
   });
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private globalService:GlobalService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/article';
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }
//Handle create and update article
onLoginFormSubmit() {
  this.processValidation = true;   
  if (this.loginForm.invalid) {
       return; //Validation failed, exit from method.
  }   
  //Form is valid, now perform create or update
  this.preProcessConfigurations();
  let username = this.loginForm.get('username').value.trim();
    let password = this.loginForm.get('password').value.trim();	  
  
    //Handle create article 
    this.userService.getUser(username,password)
    .subscribe(
      data => {
        this.user = data;
  
        if(this.user && this.user.length>0)
        {
          console.log("Success");
          localStorage.setItem("loggin",JSON.stringify(this.user));
          this.userService.setLoginUserDetail(this.user);
          this.globalService.setLoginStatus(true);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          console.log("Loggin Failed");
          alert("Loggin Failed");
        }
      },
      errorCode =>  this.statusCode = errorCode);
 
 }
}
