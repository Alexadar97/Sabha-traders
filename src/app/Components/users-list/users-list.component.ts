import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
declare var $: any;
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  get uname() {
    return this.Newuser.get('username');
  }
  get email() {
    return this.Newuser.get('email');
  }
  get branch() {
    return this.Newuser.get('branchid');
  }

  get custype() {
    return this.Newuser.get('type');
  }

  get pwd() {
    return this.Newuser.get('password');
  }

  Newuser: FormGroup
  private UserSaveapi = this.getdata.appconstant + 'users/save';
  private UserExitapi = this.getdata.appconstant + 'users/adminExist';
  private UserListapi = this.getdata.appconstant + 'users/list';
  private UserGetapi = this.getdata.appconstant + 'users/get?';
  private UserUpdateapi = this.getdata.appconstant + 'users/update';
  private BranchListapi = this.getdata.appconstant + 'branch/list';
  private UserPaginationapi = this.getdata.appconstant + 'users/getPaginationCount'
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute, private _pur: PurhasedataService) {
    this.Newuser = this.fb.group({
      _id: null,
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      branchid: [''],
      type: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    })
  }
  admin = 0
  loading=false
  pagecount = 0
  ngOnInit() {
    this.Users()
    this.adminexit()
    this.loading = true;
    this.Pagination_Count();
  }
  // Admin exit API
  adminexit() {
    return this.makeapi.method(this.UserExitapi, "", "post")
      .subscribe(data => {
        this.admin = data.admin
      },
        Error => {
        });

  }
  modelbtn: any;
  modelbtn1: any;
  onclick() {
    this.modelbtn = "add"
    this.modelbtn1 = "emailshow"
    this.Newuser.reset()
    $("#myModal").modal("show")
    this.pass_error = ""
    this.search = ""
  }
  //  submit button
  braname: any
  submit_user() {
    var getform = this.Newuser.value
    getform.type = this.sub1
    getform.branchid = this.branch_I
    if (getform.type == 'Admin') {
      getform.branchid = "NA"
      this.Newuser.patchValue(getform)
    }
    if ((this.Newuser.invalid) || (getform.username.trim() == '') || (getform.type == "User" && getform.branchid == "")) {
      this.markFormGroupTouched(this.Newuser);
      this.getdata.notify('Form is Invalid');

    } else {
      var reqdata = "usersDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.UserSaveapi, reqdata, "post")
        .subscribe(data => {
          if (data.message == "User already exists") {
            this.getdata.notify(data.message);
          } else if (data.message == "User created successfully") {
            this.getdata.notify('New User Details has been Added Successfully');
            $("#myModal").modal("hide")
            this.Users()
            this.adminexit()
          }
        },
          Error => {
          });
    }
  }
  // User List API
  User_List = [];
  Users() {
    var reqdata ="searchstr=" + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.UserListapi,reqdata, "post")
      .subscribe(data => {
        this.User_List = data
      },
        Error => {
        });
  }

  // Edit Get API
  viewprod_det(id) {
    var reqdata = "_id=" + id
    this.makeapi.method(this.UserGetapi + reqdata, "", "get")
      .subscribe(data => {
        console.log(data)
        var branch_name = data
        if (data.branch != null) {
          branch_name.branchid = data.branch.branchname
        }
        if (data.type == 'Admin') {
          this.search = ""
        }
        else {
          this.search = "search"
        }
        this.Newuser.patchValue(branch_name)
      },
        Error => {
        });
  }
  // Click Edit Button 
  product: any
  edit_user(id) {
    this.modelbtn = "edit"
    this.modelbtn1 = "emailhide"
    this.viewprod_det(id)
    $("#myModal").modal("show")

  }
  // Click To Update Submit
  Update_user() {
    var getform = this.Newuser.value
    this.Newuser.patchValue(getform)
    if ((this.Newuser.invalid) || (getform.username.trim() == '')) {
      this.markFormGroupTouched(this.Newuser);
      this.getdata.notify('Form is Invalid');
    } else {
      var getform = this.Newuser.value
      getform.branchid = this.changevalcd
      var reqdata = "usersDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.UserUpdateapi, reqdata, "post")
        .subscribe(data => {
          this.getdata.notify('User has been Updated Successfully');
          $("#myModal").modal("hide")
          this.Users()
          this.adminexit()
        },
          Error => {
          });
    }
  }
  cancel() {
    this.Newuser.reset()
    $("#myModal").modal("hide")
    this.search = ""
  }
  //  Select Branch name
  branch_id
  branch_name: any;
  pending_list: any;
  case_error: any
  custom: any
  changevalcd
  branch_I
  branch_N
  Changeselectcd5(val) {
    var map = {}
    for (let i = 0; i < this.branch_name.length; i++) {
      map[this.branch_name[i]._id] = this.branch_name[i].branchname
      var emtobj = this.branch_name[i]
      if (emtobj._id == this.branch_name[i]._id) {
        var stroeObj = emtobj
      }
      console.log(stroeObj)
    }
    this.branch_N = map[val]
    this.branch_I = val
    $("#branchname").val(this.branch_N)
    $("#selectbranch").hide()
    stroeObj.branchid = this.branch_N
    this.Newuser.patchValue(stroeObj)
  }
  // Search Branch name
  search_brenchtype(value) {
    if (value.length == 0) {
      var empty = this.Newuser.value
      this.branch_name.splice(value, 1);
      this.branch_name = []
      $("#selectbranch").hide()
      this.Newuser.patchValue(empty);
      this.case_error = ""
    } else {
      var reqdata = "searchstr=" + value
      return this.makeapi.method(this.BranchListapi, reqdata, "post")
        .subscribe(data => {
          this.branch_name = data;
          if (data.length > 0) {
            $("#selectbranch").slideDown()
            this.case_error = ""
          } else if (data.length == 0) {
            this.branch_name.splice(value, 1);
            this.case_error = "case_error"
            $("#selectbranch").hide()
          }
        },
          Error => {
          });
    }
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

  //  Password Show & Hide
  show_button: any
  show_eye: Boolean = false;
  showPassword(i) {
    if(i == this.show_button){
      //close the item
      this.show_button = -1
    }else{
      this.show_button = i
    }
  }
  show_button1: Boolean = false;
  show_eye1: Boolean = false;
  showPassword1() {
    this.show_button1 = !this.show_button1;
    this.show_eye1 = !this.show_eye1;
  }
  // Password Validators
  pass_error: any
  password(value) {
    var pass = value
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.exec(pass) == null) {
      this.pass_error = "pass_error"
    }
    else {
      this.pass_error = ""
    }
  }
  // Search Data API
  search_event(value) {
    var reqdata = "searchstr=" + value + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.UserListapi, reqdata, "post")
      .subscribe(data => {
        this.User_List = data
        console.log(data)
      },
        Error => {
        });
  }
  sub1: any;
  search: any
  search2: any
  // Drapdown Click type
  checkbox(value) {
    this.sub1 = value
    if (this.sub1 == 'Admin') {
      this.search = ""
    }
    else {
      this.search = ""
    } if (this.sub1 == 'User') {
      this.search = "search"
    } else {
      this.search2 = ""
    }
    $(document).ready(() => {
      $('[name=options]').val(value);
    });
  }
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    var reqdata = "searchstr=" 
    return this.makeapi.method(this.UserPaginationapi, reqdata, "post")
      .subscribe(data => {
        this.loading = false
        var totalcount = data['pagecount'];
        this.totalPartCount = totalcount; 

        this.totalPages = Math.ceil(this.totalPartCount / this.currentPageCount);
        var pagination = 0
        for(let i=0; i<this.totalPages; i++){
          pagination++
          this.paginationCount.push(pagination)
        }
      },
        Error => {
        });
  }
  currentPage = 1;
  totalPages = 10;
  show_page = false
  paginatePartList(page) {
    // this.checkclicksingle = [];
    this.show_page = true
    if (page == 'prev' && this.currentPage > 1) {
      if (page == 'prev') {
        this.loading = true;
      }
      else {
        this.loading = false;
      }
      this.currentPage = this.currentPage - 1;
      this.pagecount = this.pagecount -1     
    }
    else {
      if (page == 'next') {
        this.loading = true;
      }
      else {
        this.loading = false;
      }
      this.currentPage = this.currentPage + 1
      this.pagecount = this.pagecount+1
    }
    this.Users()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.Users()
    this.show_page = true
  }
  count_cal(value){
    this.Pagination_Count()
    if(value == 1){
      this.currentPageCount = this.currentPageCount+5
    }else if(value == 2 && this.currentPageCount > 10){
      this.currentPageCount = this.currentPageCount-5
    }
    this.currentPage = 1
    this.pagecount = 0
    this.Users()
  }
}
