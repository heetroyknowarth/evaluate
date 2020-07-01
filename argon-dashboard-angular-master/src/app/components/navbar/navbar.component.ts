import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { request } from 'http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  authUser;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router,private httpClient: HttpClient) {
    this.location = location;
  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.userFetch();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const {url} = request;
    const {length} = url;

    const addToHeaders = {'Access-Control-Allow-Origin': '*'};

    // const token = sessionStorage.getItem('auth_token');
    const token = localStorage.getItem('auth_token');

    if (token) {
      addToHeaders['Authorization'] = 'Bearer ' + token;
      console.log(addToHeaders);
      const requestClone = request.clone({
        setHeaders: addToHeaders
      });

      return next.handle(requestClone).pipe(
        catchError(
          (err) => {
            if (err.status === 401){
              localStorage.clear();
              // sessionStorage.clear();
              // this.toastr.error('Something went wrong', 'Oops!');
              // location.reload(true);
              this.router.navigate(['/#/login']);

            }
            throw err;
          }
        )
      );
    } else {
      return next.handle(request);
      // Redirect to Login later on!
    }
  }
  userFetch(){
    

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.httpClient.post(`http://localhost/api/public/api/user`,"").subscribe(
        (res: any) => {
          if (res) {
           console.log("User Success"+res.name);
          } else {
            console.log("error");
            // this.toastr.error(' Invalid Credentials ', 'Oops!');

          }

        }, (error) => {
          //this.toastr.error(' Something Went Wrong ', 'Oops!');
          //this._snackBar.errorSnackBar('Invalid Credentials ', '');
        }
    );
  }
  onLogout() {
    localStorage.clear();
    location.reload(true);
    this.router.navigate(['/login']);
  }

}
