import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authUser;
  emailAddress = '';
  password = '';
  user: any;
  constructor(private router: Router,private httpClient: HttpClient) {}

  ngOnInit() {
    if(localStorage.getItem('auth_token'))
    {
      this.router.navigate(['/dashboard']);
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy() {
  }

  login(){
    
    this.authUser = {
      email: this.emailAddress,
      password: this.password
    };
    console.log(this.authUser)

    this.httpClient.post(`http://localhost/api/public/api/login`,this.authUser).subscribe(
      (token: any) => {
        if (token) {
    localStorage.setItem('auth_token',token.access_token);
    this.router.navigate(['/dashboard']);
    //       location.reload(true);
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

}
