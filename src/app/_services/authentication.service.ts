import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


@Injectable()
export class AuthenticationService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    public token: string;

    constructor(
        private _http: Http
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string):Promise<User> {
        return this._http
        .post(`${environment.apiEndPointUnAuth}login`, 
        JSON.stringify({ email: email, password: password }),
        {headers: this.headers})
        .toPromise()
        .then((res)=>res.json())
        .catch(this.handleError)
    }

    signup(object:User):Promise<User> {
        return this._http
        .post(`${environment.apiEndPointUnAuth}signup`, object)
        .toPromise()
        .then((res)=>res.json())
        .catch(this.handleError)
    }

    sendEmail(object:User):Promise<User>{
        return this._http
        .post(`${environment.apiEndPointUnAuth}recovery`, object)
        .toPromise()
        .then((res)=>res.json())
        .catch(this.handleError)
    }

    resetPassword(object:User):Promise<User>{
        return this._http.post(`${environment.apiEndPointUnAuth}reset`, object)
        .toPromise()
        .then((res)=>res.json())
        .catch(this.handleError)
    }

   

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    // private helper methods
    public jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

 
}