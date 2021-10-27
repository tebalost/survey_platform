import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Authority} from '../../authority';
import {AllAuthorityParticipantReport} from '../../reports/all-authority-participant-report';
import {AllParticipantAuthorities} from '../../reports/all-participant-authorities';
import {AllAuthoritiesParticipants} from '../../reports/all-authority-participants';
import {MhealthFile} from '../../mHealth-file';
import {Adherence, Surveys, TopMenuReport} from '../../dashboard-reports';
import {UssdFile} from '../../ussd-file';

@Injectable({
    providedIn: 'root'
})
export class MhealthApiService {
    [x: string]: any;

    private SEED_AUTHORITY = 'SEEDM001';
     private REST_API_SERVER_HOST = 'https://mhealth.zuatech.africa/api/';

    constructor(private http: HttpClient) {
    }

    addAuthority(authority: Authority) {
        const saveAuthorityUrl = this.REST_API_SERVER_HOST + 'create-update-client';
        this.http.post(saveAuthorityUrl, [authority])
            .subscribe(res => {
                console.log(res);
            })
    }

    // tslint:disable-next-line:max-line-length
    public allAuthoritySurveyParticipantReport(authorityCode: string, roleCode: string, pageIndex: string, pageSize: string, type: string = undefined,
        msisdn: string = undefined) {
        return this.http.get<AllAuthorityParticipantReport[]>(`${this.REST_API_SERVER_HOST +
            'all-authority-participant-reports-surveys-pages/authority/' + authorityCode + '/role/' + roleCode + '?pageNo=' + pageIndex + '&pageSize=' + pageSize + '&sortBy=updatedAt'}`)
            .pipe(
                map(reportRows =>
                    reportRows
                        .filter(reportRow => {
                            // tslint:disable-next-line:triple-equals
                            if (type != undefined || msisdn != undefined) {
                                if (reportRow.type === type && reportRow.msisdn === msisdn) {
                                    return true;
                                    // tslint:disable-next-line:triple-equals
                                } else if (reportRow.type === type && msisdn == undefined) {
                                    return true;
                                    // tslint:disable-next-line:triple-equals
                                } else if (type == undefined && reportRow.msisdn === msisdn) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true
                            };
                        })),
                catchError(this.handleError<Authority[]>('getParticipantReport', [])));

    }

        // tslint:disable-next-line:max-line-length
        public allAuthorityAdherenceParticipantReport(authorityCode: string, roleCode: string, pageIndex: string, pageSize: string, type: string = undefined,
            msisdn: string = undefined) {
            return this.http.get<AllAuthorityParticipantReport[]>(`${this.REST_API_SERVER_HOST +
                'all-authority-participant-reports-adherances-pages/authority/' + authorityCode + '/role/' + roleCode + '?pageNo=' + pageIndex + '&pageSize=' + pageSize + '&sortBy=updatedAt'}`)
                .pipe(
                    map(reportRows =>
                        reportRows
                            .filter(reportRow => {
                                // tslint:disable-next-line:triple-equals
                                if (type != undefined || msisdn != undefined) {
                                    if (reportRow.type === type && reportRow.msisdn === msisdn) {
                                        return true;
                                        // tslint:disable-next-line:triple-equals
                                    } else if (reportRow.type === type && msisdn == undefined) {
                                        return true;
                                        // tslint:disable-next-line:triple-equals
                                    } else if (type == undefined && reportRow.msisdn === msisdn) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return true
                                };
                            })),
                    catchError(this.handleError<AllAuthorityParticipantReport[]>('getParticipantReport', [])));
    
        }

    public countAllAuthorityParticipantReportRows(authorityCode: string, roleCode: string) {
        return this.http.get<Number>(`${this.REST_API_SERVER_HOST +
        'count-all-authority-participant-report-rows/authority/' + authorityCode + '/role/' + roleCode }`)
            .pipe(catchError(this.handleError('countAllAuthorityParticipantReportRows', [])));
    }

    public allParticipantAuthorities() {
        return this.http.get<AllParticipantAuthorities[]>(`${this.REST_API_SERVER_HOST + 'all-authorities'}`)
            .pipe(catchError(this.handleError<AllParticipantAuthorities[]>('getAllParticipantAuthorities', [])));
    }

    public allAuthoritiesParticipants(authorityCode: string) {
        return this.http.get<AllAuthoritiesParticipants[]>(`${this.REST_API_SERVER_HOST + 'all-authority-participants/' + authorityCode}`)
            .pipe(catchError(this.handleError<AllAuthoritiesParticipants[]>('getAllParticipantAuthorities', [])));
    }

    public getActiveAuthorities() {
        return this.http.get<Authority[]>(`${this.REST_API_SERVER_HOST + 'list-active-authorities'}`)
            .pipe(
                map(authorities =>
                    authorities.filter(authority => authority.code !== this.SEED_AUTHORITY)),
                catchError(this.handleError<Authority[]>('searchAuthorities', [])));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any) => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    getdashboardTopMenuApi(authorityCode: string, roleCode: string) {
        return this.http.get<TopMenuReport[]>(`${this.REST_API_SERVER_HOST + 'dashboard-top-menu-stats/' + authorityCode + '/role/' + roleCode}`)
            .pipe(catchError(this.handleError<Authority[]>('dashboardTopMenu', [])));
    }

    getdashboardBarChatApi(authorityCode: string, roleCode: string) {
        return this.http.get<Surveys[]>(`${this.REST_API_SERVER_HOST + 'surveys-states/' + authorityCode + '/role/' + roleCode}`)
            .pipe(catchError(this.handleError<Authority[]>('dashboardSurveys', [])));
    }

    getdashboardPieChatApi(authorityCode: string, roleCode: string) {
        return this.http.get<Adherence[]>(`${this.REST_API_SERVER_HOST + 'adherence-states/' + authorityCode + '/role/' + roleCode}`)
            .pipe(catchError(this.handleError<Authority[]>('dashboardAdherence', [])));
    }

    /**
     *
     * @param mhealthFileList Uploads the mhealth participants file manually
     *
     * @returns - upload status message
     */
    public uploadMhealthFile(mhealthFileList: MhealthFile []): Observable<MhealthFile []> {
        const uploadMhealthFileUrl = this.REST_API_SERVER_HOST + 'upload-mHealth-file';
        return this.http.post<MhealthFile[]>(uploadMhealthFileUrl, mhealthFileList, this.httpOptions)
            .pipe(
                tap((mhealthFile: any) => console.log('imported mHealth files')),
                catchError(this.handleError<MhealthFile []>('uploadMhealthFile'))
            )
    }
    public uploadUssdFile(ussdFileList: UssdFile []): Observable<UssdFile []> {
        const uploadUssdFileUrl = this.REST_API_SERVER_HOST + 'upload-ussd-file';
        return this.http.post<UssdFile[]>(uploadUssdFileUrl, ussdFileList, this.httpOptions)
            .pipe(
                tap((ussdFile: any) => console.log('imported ussd files')),
                catchError(this.handleError<UssdFile []>('uploadUssdFile'))
            )
    }
}

export interface MhealthFileList {
    mhealthFileList: MhealthFile [];
}

export interface UssdFileList {
    ussdFileList: UssdFile [];
}
