import { Component, OnInit,  Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Headers, Http} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../_models/user";


import { AuthenticationService} from '../_services/authentication.service';
import { AlertService} from '../_services/alert.service';
import { IAlert } from '../_models/ialert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};
  loading = false;
  showForm:boolean;
  returnUrl: string;
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  forgetForm:FormGroup;

  constructor(
    private _fb: FormBuilder,
     private _fbc: FormBuilder,
    private _alertService: AlertService,
    private _authenticationService: AuthenticationService,
    private _router: Router,    
    private _http: Http) {
      this.createForm();
      this.ForgetPassword();
    }

 createForm() {
    this.loginForm = this._fb.group({     
       'email':['', Validators.compose([ Validators.required,  Validators.email])],
        'password' : ['',Validators.compose([Validators.required ,Validators.minLength(6)])]
    });
  }

  ForgetPassword() {
    this.forgetForm = this._fbc.group({     
       'email':['', Validators.compose([ Validators.required,  Validators.email])]
    });
  }

  ngOnInit() {
  }

  /**
   * Login form
   */
  ngSubmit(user){
      this.loading = true;
      this._authenticationService.login(user.email, user.password)
          .then((res)=>{
                let user = res; // login successful if there's a jwt token in the response
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user)); // store user details and jwt token in local storage to keep user logged in between page refreshes
                    setTimeout(()=>{ this._router.navigate(['/dashboard']);},1);
                }              
          }).catch((err)=>{
            this.alerts.push({
              id: 1,
              type: 'danger',
              message: 'User/Pass didn\'t match',
            });
          })
  }

  public ForgetEmail(email:User){
    this._authenticationService.sendEmail(this.forgetForm.value).then((res)=>{
      this.alerts.push({
              id: 1,
              type: 'success',
              message: 'Email Send Success',
            });
        this.ForgetPassword();
    }).catch((err)=>{
            this.alerts.push({
              id: 1,
              type: 'danger',
              message: 'Email didn\'t match',
            });
          });
          
 // console.log(email.forgetemail);
  }

 
  /**
   * Close alert
   */
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }


}
