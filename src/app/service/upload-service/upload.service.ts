import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as Http from 'http';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    // @ts-ignore
    constructor(private http: Http) {}


    // @ts-ignore
    public uploadImage(image: File): Observable<Response> {
        // @ts-ignore
        let formData: formData;
        formData = new formData();

        formData.append('image', image);

        return this.http.post('/api/v1/image-upload', formData);
    }
}
