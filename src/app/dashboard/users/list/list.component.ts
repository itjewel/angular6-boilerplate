import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';
import { IAlert } from '../../../_models/ialert';

import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [NgbPaginationConfig]
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  page:number = 1;
  totalItems:number;
  itemsPerPage: number = 10;
  search:string = "";
   public alerts: Array<IAlert> = [];
   private backup: Array<IAlert>;
  
  constructor(
   private _router: Router, 
   private _route: ActivatedRoute,
   private _userService : UserService,
   private _paginationConfig: NgbPaginationConfig
  ) 
  {
    //_paginationConfig.size = 'sm';
  }

  ngOnInit() {
    this.page = this._route.snapshot.queryParams["page"] || 1;
    this.getUsers({page:this.page,per_page:this.itemsPerPage,search: this.search});
  }

  onKey(e){
    if(e.target)
      this.search = e.target.value;
    else
      this.search = e;
    this.getUsers({page:this.page,per_page:this.itemsPerPage,search: this.search});  
  }

  loadPage(e){
    this.page = e;
    this.getUsers({page:this.page,per_page:this.itemsPerPage,search: this.search});
    this._router.navigate(['/dashboard/users'],{queryParams:{page:this.page}});
  }

  getUsers(pagination){
    this._userService.getUsers(pagination).then(res => {
          if(res.status == 'ok'){
            this.users = res.users.data;
            this.totalItems = res.users.total;
          }
      });
  }

  deleteUser(id){
     this._userService.delete(id).then(res=>{
      // console.log(res);
        this.alerts.push({
          id: 1,
          type: 'danger',
          message: 'User Deleted Successfully',
        });
         this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));  
        this.getUsers({page:this.page,per_page:this.itemsPerPage,search: this.search});
        
        
     })
   
  }

public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public sayHellow(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('Hi Jewel');
    },50);
    });
  }


}
