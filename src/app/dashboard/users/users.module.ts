/**
 * Created by: Masum 
 * Create on 16-July-2017
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { UsersComponent } from './users.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { UserListComponent } from './list/list.component';

import { UserService } from '../../_services/user.service';
import { ErrorService } from '../../_services/error.service';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule
  ],
  providers: [ 
    UserService,
    ErrorService
  ],
  declarations: [
    UsersComponent,
    CreateComponent,
    EditComponent,
    UserListComponent
  ]
})
export class UsersModule { }
