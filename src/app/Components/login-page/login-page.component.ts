import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  get userid() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  login: FormGroup
  private Loginapi = this.getdata.appconstant + 'login';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private route: ActivatedRoute) {
    this.login = this.fb.group({
      _id: null,
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit() {
  }
  // Logon Click
  onLogin() {
    var getform = this.login.value
    if (this.login.invalid) {
      this.markFormGroupTouched(this.login);
      this.getdata.notify('Please check the User Name or Password');
    } else {
      var data = { "email": getform.email, "password": getform.password }
      var reqdata = "loginDetails=" + JSON.stringify(data)
      return this.makeapi.method(this.Loginapi, reqdata, "post")
        .subscribe(data => {
          if (data.message == "failure") {
            this.getdata.notify('Your Login is invaild');
          } else if (data.message == "success") {
            localStorage.setItem("login_user", data.username)
            localStorage.setItem("usertype", data.type)
            localStorage.setItem("branchid", data.branchid);
            localStorage.setItem("userid", data.userid);
            this.getdata.notify('Welcome to Sabha-Traders');
            if (data.type == "Admin") {
              this.router.navigateByUrl("/dashbord/dashboard-data")
            } else {
              this.router.navigateByUrl("/dashbord/invoicelist")
            }
          }
        },
          Error => {
          });
    }
  }
  // Forget Click
  forget() {
    this.getdata.notify('Please Contact Admin');
  }
  // Form Validators
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Password Visible
  show_button1: Boolean = false;
  show_eye1: Boolean = false;
  showPassword1() {
    this.show_button1 = !this.show_button1;
    this.show_eye1 = !this.show_eye1;
  }
}
