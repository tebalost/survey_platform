import {Injectable, Inject} from '@angular/core';
import {HttpInterceptor, HttpXsrfTokenExtractor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
// import {Observable} from "rxjs";

import { Observable } from 'rxjs/Observable';

// @ts-ignore
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

   constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let requestMethod: string = req.method;
      requestMethod = requestMethod.toLowerCase();

      if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'get' || requestMethod === 'put')) {
         const headerName = 'X-XSRF-TOKEN';
         const token = this.tokenExtractor.getToken();
         console.log('Token: ' + token);
         if (token !== null && !req.headers.has(headerName)) {
            req = req.clone({headers: req.headers.set(headerName, token)});
         }
      }
      console.log('Request: IN THE FILTER  ' + JSON.stringify(req));
      console.log('Request Method: ' + requestMethod);
      return next.handle(req);
   }
}
