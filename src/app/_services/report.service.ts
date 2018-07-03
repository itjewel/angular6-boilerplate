import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import { UserReport } from '../_models/user';
import { environment } from '../../environments/environment'
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from '../_services/error.service';


@Injectable()

export class ReportService {


  constructor(
      private _http: Http,
      private _errorService : ErrorService,
      private _authenticationService: AuthenticationService
    ) 
    {}

    getReport():Promise<UserReport>{
        return this._http.get(`${environment.apiEndPoint}report`,
            this._authenticationService.jwt())
         .toPromise()
         .then(res=>res.json())
         .catch(this._errorService.handleError);
    }

    getGraph():Promise<any>{
        return this._http.get(`${environment.apiEndPoint}graph`, 
            this._authenticationService.jwt()
        )
         .toPromise()
         .then(res=>res.json())
         .catch(this._errorService.handleError);
    }

    getLatestUsers():Promise<any>{
          return this._http.get(`${environment.apiEndPoint}leatestUsers`, 
            this._authenticationService.jwt()
          ).toPromise()
         .then(res=>res.json())
         .catch(this._errorService.handleError);
    }
 
}
