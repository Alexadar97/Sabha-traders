import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebserviceService } from 'src/app/services/webservice.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', 'dashboard-768px.css', 'dashboard-1024px.css', 'dashboard-1024px.css']
})
export class DashboardComponent implements OnInit {


  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private route: ActivatedRoute) { }
  logintype: any
  usertype: any
  ngOnInit() {
    this.logintype = localStorage.getItem("login_user")
    this.usertype = localStorage.getItem("usertype")
  }
  // logout Click
  onLogout() {
    this.router.navigateByUrl("/login");
    localStorage.removeItem("branchid");
  }
}
