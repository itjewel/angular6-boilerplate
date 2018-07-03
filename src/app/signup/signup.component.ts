import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {cookie} from 'cookie';
import { environment } from '.../../environments/environment';
import {AuthenticationService} from '../_services/authentication.service';


import { IAlert } from '../_models/ialert';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
   form: FormGroup;
    public alerts: Array<IAlert> = [];
    private backup: Array<IAlert>;

  constructor(
    private fb: FormBuilder,
     private _authenticateService: AuthenticationService,
  ) { 
     this.createForm();
  }


  ngOnInit() {
   
  }

  createForm() {
    this.form = this.fb.group({
      'status':['active'],
       'first_name': ["", Validators.required ],
       'last_name' : ["", Validators.compose([Validators.required]) ],       
       'email':['', Validators.compose([ Validators.required,  Validators.email])],
        'password' : ['',Validators.compose([Validators.required ,Validators.minLength(6)])]
    });
  }

  onSubmit(user){
   //console.log(user);
  this._authenticateService.signup(user).then((res)=>{
          //console.log(res); 
          if(res){        
            this.alerts.push({
              id: 1,
              type: 'success',
              message: 'User added succesfully.',
            });
            this.createForm();
            this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));        
            //setTimeout((router: Router) => {this._router.navigate(['/dashboard/users'])} ,4000);
          }             
          //setTimeout((router: Router) => {this._router.navigate(['/dashboard/users'])} ,4000);
        }).catch((err)=>{
            this.alerts.push({
              id: 1,
              type: 'danger',
              message: 'Email Already exist\'s',
            });
          });
      }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  

}
