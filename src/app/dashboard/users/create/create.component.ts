import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user';
import { IAlert } from '../../../_models/ialert';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  ngForm: FormGroup; // <--- heroForm is of type FormGroup


//  myModel = new Test(1,'hi masum');
 public alerts: Array<IAlert> = [];
 private backup: Array<IAlert>;
 public emailExist:boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
    ) 
  {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.ngForm = this.fb.group({
       'first_name': ["", Validators.required ],
       'last_name' : ["", Validators.compose([Validators.required, Validators.minLength(2)]) ],
       'status' : ['active', Validators.compose([Validators.required])],
       'phone':[null],
       'gender':['male'],
       'address':[''],
       'email':['', Validators.compose([
          Validators.required, 
          Validators.email]),this.checkEmailExist.bind(this)],
       'password':['', Validators.compose([Validators.required])],
       'confirm_password':['', Validators.compose([Validators.required])]
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
  }
  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirm_password = group.controls[confirmPasswordKey];

      if (password.value !== confirm_password.value) {
        return {        
          mismatchedPasswords: true
        };
      }
    }
  }

  checkEmailExist(control:any):Promise<any>{
    return this._userService.checkEmailExist(control).then((res)=>{
       this.emailExist = false;
      if(res !== null) this.emailExist = true;
     
      return res;
    });
  }

  ngSubmit(){
    console.log(this.ngForm.value);
    this._userService.create(this.ngForm.value).then((res)=>{
      if(res.status == "ok"){        
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'User added succesfully.',
        });
       //this.ngForm.reset();
       this.createForm() ;    
        this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));   
         
        //setTimeout((router: Router) => {this._router.navigate(['/dashboard/users'])} ,4000);
      }
    });

  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
