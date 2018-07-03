import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  template: `<router-outlet></router-outlet>` //We gonna route create, edit and list over here
})
export class UsersComponent implements OnInit {

  constructor() 
  {}

  ngOnInit() {
  }

}
