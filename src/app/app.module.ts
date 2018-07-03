import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { routing }        from './_config/app.routing';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';



import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/index';
import { AlertService } from './_services/alert.service';
import { MenuComponent } from './menu/menu.component';

import { NavTopComponent } from './dashboard/nav-top/nav-top.component';
import { NavLeftComponent } from './dashboard/nav-left/nav-left.component';

import { ResetComponent } from './reset/reset.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DashboardModule } from './dashboard/dashboard.module';
import { LaravelDocComponent } from './laravel-doc/laravel-doc.component';
import { AngularDocComponent } from './angular-doc/angular-doc.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    NavTopComponent,
    NavLeftComponent,
    ResetComponent,
    NavLeftComponent,
    LaravelDocComponent,
    AngularDocComponent
  ],
  imports: [
    DashboardModule,
    NgbModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }) 
  ],
  exports: [ // export for the DemoModule
    AppComponent
  ],
  providers: [
    AuthenticationService, 
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
