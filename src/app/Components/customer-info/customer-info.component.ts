import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
declare var $, moment, require: any;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css', 'customer-info-768px.css']
})
export class CustomerInfoComponent implements OnInit {
  Addpayment: FormGroup
  pending_list: any;
  modelbtn1: any;
  bill_history = []
  cus_name: any;
  modelbtn: any;
  chkvalu: any;
  Cash: any
  Cheque: any
  cus_info_id: any;
  customer: any;
  cheque_amt: any
  case_amt: any;
  today= new Date()
  get cash() {
    return this.Addpayment.get('cashamount');
  }
  get chvalue() {
    return this.Addpayment.get('chequeamount');
  }
  get chno() {
    return this.Addpayment.get('chequenumber');
  }
  get bankname() {
    return this.Addpayment.get('bankname');
  }
  get chdate() {
    return this.Addpayment.get('chequedate');
  }
  get ctype() {
    return this.Addpayment.get('type');
  }
  private Customergetdateapi = this.getdata.appconstant + 'customer/get?';
  private Billing_his_getdateapi = this.getdata.appconstant + 'customer/billingHistoryList';
  private PaymentSaveapi = this.getdata.appconstant + 'payment/save';
  private Bill_His_Paginationapi = this.getdata.appconstant + 'customer/getBHPaginationCount'
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute, private _pur: PurhasedataService) {
    this.Addpayment = this.fb.group({
      custid: [null],
      cashamount: [''],
      chequeamount: [''],
      chequenumber: [''],
      bankname: [''],
      chequedate: [''],
      type: [null, Validators.compose([Validators.required])],
      pendingamount: [''],
    })
  }
  branchid: any
  usertype: any
  userid: any
  loading=false
  pagecount = 0
  ngOnInit() {
    this.cus_info_id = this.getdata.cus_info_id
    this.route.queryParams.filter(params => params.cus_info_id)
      .subscribe(params => {
        this.cus_info_id = params.cus_info_id;
        this.viewcus_det(this.cus_info_id)
      });
     
  }
  // get data
  viewcus_det(id) {
    var reqdata = "_id=" + id
    this.makeapi.method(this.Customergetdateapi + reqdata, "", "get")
      .subscribe(data => {
        console.log(data)
        this.customer = data
      },
        Error => {
        });
  }
  // View Bill Data
  viewbill_det(id) {
    var reqdata = "_id=" + id + "&searchstr=" + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    this.makeapi.method(this.Billing_his_getdateapi, reqdata, "post")
      .subscribe(data => {
        console.log(data)
        this.bill_history = data
      },
        Error => {
        });
        this.loading = true;
        this.Pagination_Count();
  }
  // Edit Bill_His Get Data
  // bill_his(id) {
  //   this.viewbill_det(id)
  //   this.loading = true;
  //   this.Pagination_Count();
  // }
  // Search Data
  search_event(value) {
    var reqdata ="searchstr=" + value +"&_id=" + this.cus_info_id + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.Billing_his_getdateapi ,reqdata, "post")
      .subscribe(data => {
        this.bill_history = data
        console.log(data)
      },
        Error => {
        });
  }
  //Click Update_Payment
  onclick() {
    this.Addpayment.reset()
    $("#myModal").modal("show")
    this.modelbtn = ""
    var getdata = this.customer
    getdata.pendingamount = getdata.pendingamount
    getdata.custid= getdata._id
    this.Addpayment.patchValue(getdata)
    if (getdata.pendingamount > 0) {
      this.modelbtn1 = "pay"
    } else {
      this.modelbtn1 = ""
    }
  }
  // Submit Update Payment
  Submit_Payment() {
    var getform = this.Addpayment.value
    var chequeDate = $("#chequeDate").val()
    getform.chequedate = chequeDate
    if (this.Cheque == "Cheque") {
      var Cheque = getform.chequedate != '' && getform.bankname.trim() != '' && getform.chequenumber != '' && getform.chequeamount != ''
      getform.cashamount = 0
    } else if (this.Cash == "Cash") {
      var Cash = getform.cashamount != ''
      getform.chequedate = "",
        getform.bankname = "",
        getform.chequenumber = "",
        getform.chequeamount = 0
    }
    this.Addpayment.patchValue(getform)
    if ((this.Addpayment.invalid) || (this.Cheque == "Cheque" && Cheque == false) || (this.Cash == "Cash" && Cash == false) ) {
      this.markFormGroupTouched(this.Addpayment);
      this.getdata.notify('Form is Invalid');
    } else {
      // getform.chdate = moment().format('DD-MM-YYYY');
      // var getform = this.customer
      getform.custid = getform.custid
      // getform.branchid = this.branchid
      // getform.usertype = this.usertype
      getform.pendingamount = getform.pendingamount.toFixed(2);
      this.Addpayment.patchValue(getform)
      if (this.Cheque == undefined) {
        getform.chequedate = "",
          getform.bankname = "",
          getform.chequenumber = "",
          getform.chequeamount = ""
      } else if (this.Cash == undefined) {
        getform.cashamount = ""
      }
      var reqdata = "paymentDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.PaymentSaveapi, reqdata, "post")
        .subscribe(data => {
          console.log(data)
          this.getdata.notify('Payment has been Added Successfully');
          $("#myModal").modal("hide")
        },
          Error => {
          });

    }
  }
  // Click To Modal Cancel Data
  Cancel() {
    this.Addpayment.reset()
    $("#myModal").modal("hide")
  }
  showCus_Name = false
  // Click Check Box
  checkbox(value) {
    this.showCus_Name = true
    this.chkvalu = value
    this.empyt();
    this.cus_name.splice(value, 1);
    console.log(value)
  }
  empyt() {
    var empty = this.Addpayment.value
    empty.custid = "";
    empty.pendingamount = ""
    this.Addpayment.patchValue(empty);
  }
  // Case Pay Click
  checkbox1(value) {
    this.Cash = value
    this.Cheque = undefined
    this.modelbtn = "CASE1"
    var getform = this.Addpayment.value
    getform.chequedate = "",
      getform.bankname = "",
      getform.chequenumber = "",
      getform.chequeamount = ""
  }
  // Cheque Pay Click
  checkbox2(value) {
    this.Cash = undefined
    this.Cheque = value
    this.modelbtn = "Cheque"
    var getform = this.Addpayment.value
    getform.cashamount = ""
  }
  // Case Input value
  input_case_amt(value) {
    this.case_amt = value
    var getform = this.customer
    getform.pendingamount = getform.pendingamount
    console.log(this.pending_list)
    if (this.case_amt < getform.pendingamount) {
      var casedata = this.Addpayment.value
      casedata.cashamount = this.case_amt
      this.Addpayment.patchValue(casedata);
    } else if (this.case_amt > getform.pendingamount) {
      this.case_amt = "";
      var casedata = this.Addpayment.value
      casedata.cashamount = "";
      this.Addpayment.patchValue(casedata);
      this.getdata.notify('Your Case amount is invalid');
    }
  }
  // Cheque Input value
  input_cheque_amt(value) {
    this.cheque_amt = value
    var getform = this.customer
    getform.pendingamount = getform.pendingamount
    if (this.cheque_amt < getform.pendingamount) {
      var casedata = this.Addpayment.value
      casedata.chequeamount = this.cheque_amt
      this.Addpayment.patchValue(casedata);
    } else if (this.cheque_amt > getform.pendingamount) {
      this.cheque_amt = "";
      var casedata = this.Addpayment.value
      casedata.chequeamount = "";
      this.Addpayment.patchValue(casedata);
      this.getdata.notify('Your Cheque amount is invalid');
    }
  }
  // Form Validation
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Cancel Btn Click
  Cancel1() {
    this.router.navigate(['/dashbord/customer']);
  }
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    var reqdata = "&searchstr=" + "&_id=" + this.cus_info_id
    return this.makeapi.method(this.Bill_His_Paginationapi, reqdata, "post")
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
      
      // if(this.currentPage>=4){
      //   var prevcount = this.currentPage
      //   prevcount--
      //   this.paginationCount.push(prevcount)
      // }
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
      // if(this.currentPage > 3){
      //   var nextcount = this.currentPage-1
      //   nextcount++
      //   this.paginationCount.push(nextcount)
      // }
    }
    // this.viewbill_det(id)
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.show_page = true
    // this.Purchase()
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
    // this.Purchase()
  }
}
