import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BusinessUser } from '../../user';

@Injectable({
    providedIn: 'root'
})
export class MhealthApiUserService {

    private SEED_AUTHORITY = "SEEDM001";
    private REST_API_SERVER_HOST = 'https://mhealth.zuatech.africa/api/';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    constructor(private http: HttpClient) {
    }


    businessUserLogin(email: string): Observable<BusinessUser> {
        const loginUrI = this.REST_API_SERVER_HOST + 'business-user-login';
        const url = `${loginUrI}/${email}`;
        console.log(`Doing a business Login ->  ${url}`);

        return this.http.get<BusinessUser>(url)
            .pipe(
                tap(businessUser => console.log(`fetched Business User =  ${JSON.stringify(businessUser)}`)),
                catchError(this.handleError<BusinessUser>(`businessUserLogin id=${email}`))
            );
    }

    public getBusinessUsers() {
        return this.http.get<BusinessUser[]>(`${this.REST_API_SERVER_HOST + 'list-business-users'}`)
            .pipe(
                map(bussinessUsers => 
                    bussinessUsers.filter(bussinessUser => bussinessUser.authorityCode !== this.SEED_AUTHORITY)),
                tap(activeUsers => activeUsers.length ?
                    console.log(`found User matching "${activeUsers}"`) :
                    console.log(`no active Users found in the DB`)),
                catchError(this.handleError<BusinessUser[]>('getAtiveUsers', []))
            );
    }

    public createUpdateUser(businessUser: BusinessUser): Observable<BusinessUser> {
        const saveBusinessUserUrl = this.REST_API_SERVER_HOST + 'create-update-user';
        return this.http.post<BusinessUser>(saveBusinessUserUrl, businessUser, this.httpOptions)
            .pipe(
                tap((newBusinessUser: BusinessUser) => console.log(`added BusinessUser`)),
                catchError(this.handleError<BusinessUser>('createUpdateUser'))
            )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any) => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}


