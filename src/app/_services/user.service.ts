import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http'; 
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from '../_services/error.service';
import { environment } from '../../environments/environment'



@Injectable()
export class UserService {
  constructor(
      private _http: Http,
      private _errorService: ErrorService,
      private _authenticationService: AuthenticationService
    ) 
    {}

    getUsers(pagination):Promise<any>{ // get users from api
        return this._http.get(`${environment.apiEndPoint}users?page=${pagination.page}&per_page=${pagination.per_page}&search=${pagination.search}`, 
            this._authenticationService.jwt()
        )
        .toPromise()
        .then(res=>res.json())
        .catch(this._errorService.handleError);
    }

     getUserById(id:number):Promise<any>{
        return this._http.get(`${environment.apiEndPoint}userDetails/${id}`, 
            this._authenticationService.jwt()
        ).toPromise()
         .then(res=>res.json())
         .catch(this._errorService.handleError);
    }

    checkEmailExist(control:any):Promise<any>{
        return this._http.post(
            `${environment.apiEndPoint}emailExists`, {email: control.value},
                this._authenticationService.jwt()
            )
            .toPromise()
            .then((res)=>{
                let response = res.json();
                if(response.status=="ok" && response.data.emailExists) return {taken:'already taken'};
                return null;
            })
            .catch(this._errorService.handleError);
    }

     /**
     * Check if email exist 
     */
    checkEmailExistEdit(control:any,id:number):Promise<any>{
        return this._http.post(`${environment.apiEndPoint}emailExistsEdit/${id}`,
            {email: control.value},
                this._authenticationService.jwt()
            )
            .toPromise()
            .then((res)=>{
                let response = res.json();
                if(response.status=="ok" && response.data.emailExists) return {taken:'already taken'};
                return null;
            })
            .catch(this._errorService.handleError);
    }

    delete(id: number): Promise<void> {
        return this._http.delete(`${environment.apiEndPoint}delete/${id}`, 
            this._authenticationService.jwt()
        )
        .toPromise()
        .then(() => null)
        .catch(this._errorService.handleError);
    }

    create(object: User): Promise<User> {
        return this._http
            .post(`${environment.apiEndPoint}signup`, object,
            this._authenticationService.jwt()
            )
            .toPromise()
            .then(res => res.json())
            .catch(this._errorService.handleError);
    }

    update(object: User, id:number): Promise<User> {
        return this._http
            .post(`${environment.apiEndPoint}update/${id}`, object,
            this._authenticationService.jwt()
            )
            .toPromise()
            .then(res => res.json())
            .catch(this._errorService.handleError);
    }

}
