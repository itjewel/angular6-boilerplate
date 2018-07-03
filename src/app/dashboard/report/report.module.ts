import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportService } from '../../_services/report.service';
import { ErrorService } from '../../_services/error.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers:[ 
    ReportService, 
    ErrorService 
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }

