import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { IfStmt } from '@angular/compiler';
declare var $, moment, require: any;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css', 'payment-768px.css']
})
export class PaymentComponent implements OnInit {
  subdealer = [];
  cus_o_sub = [];
  walk_i_cus = [];
  cus_name: any;
  modelbtn: any;
  chkvalu: any; get_Cus_id
  Cash: any
  Cheque: any
  today= new Date()
  get custype() {
    return this.Payment.get('custid');
  }
  get cash() {
    return this.Payment.get('cashamount');
  }
  get chvalue() {
    return this.Payment.get('chequeamount');
  }
  get chno() {
    return this.Payment.get('chequenumber');
  }
  get bankname() {
    return this.Payment.get('bankname');
  }
  get chdate() {
    return this.Payment.get('chequedate');
  }
  get ctype() {
    return this.Payment.get('type');
  }
  Payment: FormGroup
  private PaymentSaveapi = this.getdata.appconstant + 'payment/save';
  private PaymentListapi = this.getdata.appconstant + 'payment/list';
  private CustomerListapi = this.getdata.appconstant + 'customer/list';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute, private _pur: PurhasedataService) {
    this.Payment = this.fb.group({
      custid: [null, Validators.compose([Validators.required])],
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
  ngOnInit() {
    this.branchid = localStorage.getItem("branchid");
    this.usertype = localStorage.getItem("usertype")
    this.userid = localStorage.getItem("userid")
  }
  payment
  pendamt: any
  // Submit Payment Click
  Submit_Payment() {
    var getform = this.Payment.value
    var chequeDate = $("#chequeDate").val()
    getform.chequedate = chequeDate
    // getform.chequedate = moment(chequeDate).format('DD-MM-YYYY');
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
    this.Payment.patchValue(getform)
    if ((this.Payment.invalid) || (this.Cheque == "Cheque" && Cheque == false) || (this.Cash == "Cash" && Cash == false)) {
      this.markFormGroupTouched(this.Payment);
      this.getdata.notify('Form is Invalid');
    } else {
      if (this.Cheque == undefined) {
        getform.chequedate = "",
          getform.bankname = "",
          getform.chequenumber = "",
          getform.chequeamount = ""
      } else if (this.Cash == undefined) {
        getform.cashamount = ""
      }
      getform.custid = this.customer_I
      getform.branchid = this.branchid
      getform.usertype = this.usertype
      getform.userid = this.userid
      getform.pendingamount = getform.pendingamount.toFixed(2);
      var reqdata = "paymentDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.PaymentSaveapi, reqdata, "post")
        .subscribe(data => {
          console.log(data)
          this.getdata.notify('Payment has been Added Successfully');
          this.router.navigate(['/dashbord/paymentlist']);
          this.payment()
        },
          Error => {
          });

    }
  }
  // Click To Cancel Data
  Cancel() {
    this.router.navigate(['/dashbord/paymentlist']);
  }
  showCus_Name = false
  // Dropdown Customer type
  checkbox(value) {
    this.showCus_Name = true
    this.chkvalu = value
    this.empyt();
    this.cus_name.splice(value, 1);
    console.log(value)
    $("#selectioncd2").hide()
  }
  empyt() {
    var empty = this.Payment.value
    empty.custid = "";
    empty.pendingamount = ""
    this.Payment.patchValue(empty);
  }
  // Select Custmar Name 
  pending_list: any;
  modelbtn1: any;
  case_error: any
  custom: any
  customer_N
  customer_I
  Changeselectcd5(val) {
    var map = {}
    for (let i = 0; i < this.cus_name.length; i++) {
      map[this.cus_name[i]._id] = this.cus_name[i].name
      var emtobj = this.cus_name[i]
      if (emtobj._id == val) {
        var stroeObj = emtobj
      }
    }
    this.pending_list=stroeObj.pendingamount
    stroeObj.pendingamount = stroeObj.pendingamount
    this.customer_N = map[val]
    this.customer_I = val
    $("#customername").val(this.customer_N)
    $("#selectcustomer").hide()
    stroeObj.custid = this.customer_N
    this.Payment.patchValue(stroeObj)
    if (stroeObj.pendingamount > 0) {
      this.modelbtn1 = "pay"
    } else if (stroeObj.pendingamount = 0) {
      this.modelbtn1 = ""
    }
  }
  // Search Customer Name
  search_custype1(value) {
    if (value.length == 0) {
      var empty = this.Payment.value
      empty.pendingamount = ""
      empty.custid = ""
      empty.mobnumber1 = ""
      this.customer_N = ""
      this.cus_name = []
      $("#selectcustomer").hide()
      this.Payment.patchValue(empty);
      this.modelbtn1 = ""
      this.case_error = ""
    } else {
      var reqdata= "&searchstr=" + value + '&type=' + this.chkvalu + "&page=" + 1 + "&pageLimit=" + 10
      return this.makeapi.method(this.CustomerListapi,reqdata,"post")
        .subscribe(data => {
          this.cus_name = data;
          if (data.length > 0) {
            this.case_error = ""
            $("#selectcustomer").slideDown();
          }
          else if (data.length == 0) {
            this.case_error = "case_error"
            $("#selectcustomer").hide()
          }
        },
          Error => {
          });

    }
  }
  // Click Case cHECK BOX
  checkbox1(value) {
    this.Cash = value
    this.Cheque = undefined
    this.modelbtn = "CASE1"
    var getform = this.Payment.value
    getform.chequedate = "",
      getform.bankname = "",
      getform.chequenumber = "",
      getform.chequeamount = ""
  }
  // Click Cheque amount
  checkbox2(value) {
    this.Cash = undefined
    this.Cheque = value
    this.modelbtn = "Cheque"
    var getform = this.Payment.value
    getform.cashamount = ""
  }
  // Case Pay amount
  case_amt: any;
  input_case_amt(value) {
    this.case_amt = value
    this.pending_list
    console.log(this.pending_list)
    if (this.case_amt < this.pending_list) {
      var casedata = this.Payment.value
      casedata.cashamount = this.case_amt
      this.Payment.patchValue(casedata);
    } else if (this.case_amt > this.pending_list) {
      this.case_amt = "";
      var casedata = this.Payment.value
      casedata.cashamount = "";
      this.Payment.patchValue(casedata);

      this.getdata.notify('Your Case amount is invalid');
    }
  }
  // Cheque Pay amount
  cheque_amt: any
  input_cheque_amt(value) {
    this.cheque_amt = value
    this.pending_list

    console.log(this.pending_list)
    if (this.cheque_amt < this.pending_list) {
      var casedata = this.Payment.value
      casedata.chequeamount = this.cheque_amt
      this.Payment.patchValue(casedata);

    } else if (this.cheque_amt > this.pending_list) {
      this.cheque_amt = "";
      var casedata = this.Payment.value
      casedata.chequeamount = "";
      this.Payment.patchValue(casedata);

      this.getdata.notify('Your Cheque amount is invalid');
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
}
