import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class JWtInterceptor implements HttpInterceptor {
      constructor() {}
      intercept(request: HttpRequest<any>,next: HttpHandler) {
    
        console.log("done");
        console.log(request.url);
        const token="Bearer +";
        const requestClone = request.clone({
                setHeaders: { Authorization :token }
              });
        return next.handle(requestClone);
        // const addToHeaders = {'Access-Control-Allow-Origin': '*'};
    
        // const token = sessionStorage.getItem('auth_token');
        // const token = localStorage.getItem('auth_token');
    
        // if (token) {
        //   addToHeaders['Authorization'] = 'Bearer ' + token;
    
        //   const requestClone = request.clone({
        //     setHeaders: addToHeaders
        //   });
    
    
    // request = request.clone({
    // //   setHeaders: {
    //     setHeaders: addToHeaders
    //     // Authorization: 'Bearer '+localStorage.getItem('auth_token')//xy.yy.zz'
    // //   }
    // });    
   
  }
}