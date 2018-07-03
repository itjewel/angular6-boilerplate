import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportModule } from './report/report.module';
import { UsersModule } from './users/users.module';

import { NavFooterComponent } from './nav-footer/nav-footer.component';


import { StorageService } from '../_services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    ReportModule,
    UsersModule
  ],
  providers:[
    StorageService
  ],
  declarations: [
    NavFooterComponent
  ]
})
export class DashboardModule { }

  

