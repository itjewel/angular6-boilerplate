import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../_services/user.service';
import { IAlert } from '../../../_models/ialert';
import { User } from '../../../_models/user';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})

export class EditComponent implements OnInit {
    userData:User;
    ngForm: FormGroup;
    public alerts: Array<IAlert> = [];
    private backup: Array<IAlert>;
     public emailExist:boolean = false;

  constructor(
     private fb: FormBuilder,
     private route: ActivatedRoute,
     private _userService : UserService,
  ) { }

  ngOnInit() {
     let userId = Number(this.route.snapshot.params['id']);
     this.getUserById(userId);
     this.createForm();
  }

  getUserById(userId):void{
    this._userService.getUserById(userId).then(res => {
         this.ngForm.setValue(res.getuser,{ onlySelf: true });
         this.userData = res.getuser;
         console.log(this.userData);
      });
   }

   createForm():void {
    this.ngForm = this.fb.group({
       'id':[''],
       'first_name': ["", Validators.required ],
       'last_name' : ["", Validators.compose([Validators.required, Validators.minLength(3)]) ],       
       'phone':[''],       
       'address':[''],
       'gender':[''],
       'status' : [''],
       'email':['', Validators.compose([
          Validators.required, 
          Validators.email]),this.checkEmailExistEdit.bind(this)],
        'country':[''],
        'role':[''], 
        'created_at':[''],
        'updated_at': ['']
    });
  }

  ngSubmit(){
     let userId = Number(this.route.snapshot.params['id']);
     this._userService.update(this.ngForm.value, userId).then((res)=>{
        if(res.status == "ok"){        
          this.alerts.push({
            id: 1,
            type: 'info',
            message: 'User Update succesfully.',
        });
        this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));          
     }
    });
  }

   checkEmailExistEdit(control:any):Promise<any>{
     let userId = Number(this.route.snapshot.params['id']);     
    return this._userService.checkEmailExistEdit(control,userId).then((res)=>{
       this.emailExist = false;
      if(res !== null) this.emailExist = true;
     
      return res;
    });
  }

   public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }


 



}
