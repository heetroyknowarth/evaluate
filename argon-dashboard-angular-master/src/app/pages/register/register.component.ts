import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authUser;
  name='';
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
      this.router.navigate(['/register']);
    }
  }

  register(){
    this.authUser = {
      name: this.name,
      email: this.emailAddress,
      password: this.password
    };
    this.httpClient.post(`http://localhost/api/public/api/register`,this.authUser).subscribe(
        (res: any) => {
          if (res) {
          //   localStorage.setItem('auth_token',token.access_token);
            this.router.navigate(['/#/login']);
           console.log("Register Success");
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
