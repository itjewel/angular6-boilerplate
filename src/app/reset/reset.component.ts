import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';

import { AlertService} from '../_services/alert.service';
import { IAlert } from '../_models/ialert';
import { User } from '../_models/user';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.less']
})
export class ResetComponent implements OnInit {
resetForm: FormGroup;
 public alerts: Array<IAlert> = [];

  constructor(
      private _fb: FormBuilder,
      private _alertService: AlertService,
      private _activatedRoute: ActivatedRoute,
      private _authenticationService: AuthenticationService,
    ) {
      this.ResetPassword();
    }
 ResetPassword() {
    this.resetForm = this._fb.group({ 
       'email':['', Validators.compose([ Validators.required,  Validators.email])],    
        'password':['', Validators.compose([Validators.required])],
       'password_confirmation':['', Validators.compose([Validators.required])]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
  }

  ngOnInit() {
  }

   matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let password_confirmation = group.controls[confirmPasswordKey];

      if (password.value !== password_confirmation.value) {
        return {        
          mismatchedPasswords: true
        };
      }
    }
  }

  public ngSubmit(param:User){
      let token = this._activatedRoute.snapshot.params['token'];
      param.token =  token;

      this._authenticationService.resetPassword(param)
          .then((res)=>{
                this.alerts.push({
              id: 1,
              type: 'success',
              message: 'Password Reset Success',
            });
            this.resetForm.reset();
          }).catch((err)=>{
            this.alerts.push({
              id: 1,
              type: 'danger',
              message: 'Token didn\'t match',
            });
          })
      
  }

}
