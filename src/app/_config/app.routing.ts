import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReportComponent } from '../dashboard/report/report.component';

import { UsersComponent } from '../dashboard/users/users.component';
import { UserListComponent } from '../dashboard/users/list/list.component';
import { CreateComponent } from '../dashboard/users/create/create.component';
import { EditComponent } from '../dashboard/users/edit/edit.component';
import { ResetComponent } from '../reset/reset.component';
import { LaravelDocComponent } from '../laravel-doc/laravel-doc.component';
import { AngularDocComponent } from '../angular-doc/angular-doc.component';

import { AuthGuard } from '../_guards/index';

const appRoutes: Routes = [
    //Authorization
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'laravel-doc', component: LaravelDocComponent},
    { path: 'angular-doc', component: AngularDocComponent},
    { path: 'reset/:token', component: ResetComponent},

    //Dashboard
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children:[
            { path: '', pathMatch: 'full', component: ReportComponent },
            { path: 'users', component: UsersComponent,
                children:[
                    { path: '', pathMatch: 'full', component: UserListComponent },
                    { path: 'create', component: CreateComponent},
                    { path : 'edit/:id', component:EditComponent}
                ] 
            }
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);