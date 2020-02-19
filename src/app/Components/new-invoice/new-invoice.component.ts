import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { NgxCurrencyModule } from "ngx-currency";
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { getLocaleFirstDayOfWeek } from '@angular/common';
declare var $, moment, require: any;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css', 'new-invoice-768px.css']
})
export class NewInvoiceComponent implements OnInit {
 
  tot: any;
  disc_tot = 0;
  ton_tot = 0.05;
  nobag = 0;
  cal: any
  gist = 0.14;
  net_gst: any;
  cgst: any;
  sgst: any;
  gst1: any;
  gst2: any;
  net_totel: any;
  kg: any;
  dis: any;
  net_tot_data: any;
  sgst_data: any;
  cgst_data: any;
  total: any;
  Purchase
  pervalue: any
  ton: any
  disc: any
  t_ton: any
  modelbtn: any;
  chkvalu: any;
  Invoice
  SEARCH: any;
  today= new Date()
  get custype() {
    return this.Newinvoice.get('custid');
  }
  get invoicenum() {
    return this.Newinvoice.get('invnumber');
  }
  get billtype() {
    return this.Newinvoice.get('billrate');
  }
  get date() {
    return this.Newinvoice.get('date');
  }

  get supname() {
    return this.Newinvoice.get('suppname');
  }

  get gstinum() {
    return this.Newinvoice.get('gstin');
  }

  get address() {
    return this.Newinvoice.get('address');
  }

  get mblnum1() {
    return this.Newinvoice.get('mobnumber1');
  }

  get mblnum2() {
    return this.Newinvoice.get('mobnumber2');
  }

  get vehnum() {
    return this.Newinvoice.get('vehnumber');
  }

  get prodescri() {
    return this.Newinvoice.get('prodname');
  }

  get hsncode() {
    return this.Newinvoice.get('hsncode');
  }

  get discount() {
    return this.Newinvoice.get('discount');
  }

  get nfbags() {
    return this.Newinvoice.get('noofbags');
  }

  get tons() {
    return this.Newinvoice.get('tons');
  }

  get pbv() {
    return this.Newinvoice.get('perbagvalue');
  }
  get cashamtrec() {
    return this.Newinvoice.get('cashamount');
  }
  get amttype() {
    return this.Newinvoice.get('type');
  }
  get chdate() {
    return this.Newinvoice.get('chequedate');
  }
  get bankname() {
    return this.Newinvoice.get('bankname');
  }
  get chnum() {
    return this.Newinvoice.get('chequenumber');
  }
  get chamt() {
    return this.Newinvoice.get('chequeamount');
  }
  get branch() {
    return this.Newinvoice.get('branchid');
  }
  Newinvoice: FormGroup
  private InvoiceSaveapi = this.getdata.appconstant + 'invoice/save';
  private ProductListapi = this.getdata.appconstant + 'product/list';
  private CustomerListapi = this.getdata.appconstant + 'customer/list';
  private BranchListapi = this.getdata.appconstant + 'branch/list';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef, private _pur: PurhasedataService) {
    this.Newinvoice = this.fb.group({
      'custid': [null, Validators.compose([Validators.required])],
      'branchid': [''],
      'invnumber': [null, Validators.compose([Validators.required])],
      'billrate': [null, Validators.compose([Validators.required])],
      'date': [null, Validators.compose([Validators.required])],
      'gstin': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
      'mobnumber1': [null, Validators.compose([Validators.required])],
      'mobnumber2': [null, Validators.compose([Validators.required])],
      'vehnumber': [null, Validators.compose([Validators.required])],
      'subtotal': [null, Validators.compose([Validators.required])],
      'sgst': [null, Validators.compose([Validators.required])],
      'cgst': [null, Validators.compose([Validators.required])],
      'nettotal': [null, Validators.compose([Validators.required])],
      'prodname': [null, Validators.compose([Validators.required])],
      'hsncode': [null, Validators.compose([Validators.required])],
      'discount': [null, Validators.compose([Validators.required])],
      'noofbags': [null, Validators.compose([Validators.required])],
      'tons': [null, Validators.compose([Validators.required])],
      'totbagvalue': [null, Validators.compose([Validators.required])],
      'perbagvalue': [null, Validators.compose([Validators.required])],
      'total': [null, Validators.compose([Validators.required])],
      'cashamount': [''],
      'chequedate': [''],
      'bankname': [''],
      'chequenumber': [''],
      'chequeamount': [''],
      'type': [''],
    })
  }
  branchid: any
  usertype: any
  userid: any
  ngOnInit() {
    this._pur.Decimal();
    // this.pro_det();
    this.branchid = localStorage.getItem("branchid");
    this.usertype = localStorage.getItem("usertype")
    this.userid = localStorage.getItem("userid")
  }
  // Product List API
  product_details = []
  // pro_det() {
  //   var reqdata = "status=" + "all"
  //   return this.makeapi.method(this.ProductListapi, reqdata, "post")
  //     .subscribe(data => {
  //       this.product_details = data
  //       console.log(data)
  //     },
  //       Error => {
  //       });
  // }
  // Customer List API
  customer_details = []
  cus_det() {
    var reqdata = "status=" + "all"
    return this.makeapi.method(this.CustomerListapi, reqdata, "post")
      .subscribe(data => {
        this.customer_details = data
        console.log(data)
      },
        Error => {
        });
  }
  Cash: any
  Cheque: any
  case_error: any
  branchn: any
  // Click Submit  
  Submit_Invoice() {
    var getform = this.Newinvoice.value
    var date = $("#Date").val()
    var chequeDate = $("#chequeDate").val()
    getform.date = date
    getform.chequedate = chequeDate
    // getform.date = moment(date).format('DD-MM-YYYY');
    // getform.chequedate = moment(chequeDate).format('DD-MM-YYYY');
    if (this.Cheque == "Cheque") {
      var Cheque = getform.chequedate != '' && getform.bankname.trim() != '' && getform.chequenumber.trim() != '' && getform.chequeamount != ''
        && getform.invnumber.trim() != '' && getform.vehnumber.trim() != ''
      getform.cashamount = "0"
    } else if (this.Cash == "Cash") {
      var Cash = getform.cashamount != '' && getform.invnumber.trim() != '' && getform.vehnumber.trim() != ''
      getform.chequedate = '',
        getform.bankname = '',
        getform.chequenumber = '',
        getform.chequeamount = "0"
    }
    if (this.branchid == "NA") {
      this.branchn = this.branch_I
    } else if (this.branchid != "NA") {
      this.branchn = this.branchid
    }
    if ((this.Newinvoice.invalid) || (this.Cheque == "Cheque" && Cheque == false) || (this.Cash == "Cash" && Cash == false) || (this.customer_I == "")) {
      this.markFormGroupTouched(this.Newinvoice);
      this.getdata.notify('Form is Invalid');
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    } else {
      if (this.Cheque == undefined) {
        getform.chequedate = "",
          getform.bankname = "",
          getform.chequenumber = "",
          getform.chequeamount = ""
      }
      if (this.Cash == undefined) {
        getform.cashamount = ""
      }
      getform.nettotal = this.net_totel.toFixed(2);
      var data = {
        "branchid": this.branchn, "usertype": this.usertype, "userid": this.userid,
        "custid": this.customer_I, "invnumber": getform.invnumber, "billrate": getform.billrate, "date": getform.date, "gstin": getform.gstin,
        "address": getform.address, "mobnumber1": getform.mobnumber1, "mobnumber2": getform.mobnumber2, "vehnumber": getform.vehnumber, "subtotal": getform.subtotal, "sgst": getform.sgst,
        "cgst": getform.cgst, "nettotal": getform.nettotal, "name": "",
        products: [{
          "prodid": this.product_I ,
          "prodname": getform.prodname, "hsncode": getform.hsncode, "discount": getform.discount, "noofbags": getform.noofbags,
          "tons": getform.tons, "totbagvalue": getform.totbagvalue, "perbagvalue": getform.perbagvalue, "total": getform.total
        }],
        payment: { "cashamount": getform.cashamount, "chequedate": getform.chequedate, "bankname": getform.bankname, "chequenumber": getform.chequenumber, "chequeamount": getform.chequeamount, "type": getform.type }
      }
      var reqdata = "invoiceDetails=" + JSON.stringify(data)
      return this.makeapi.method(this.InvoiceSaveapi, reqdata, "post")
        .subscribe(data => {
          if (data.message == "Invoice already exists") {
            // $(document).ready(() => {
            //   $('[name=options]').val(this.prod_index);
            // });
            this.getdata.notify("Please Check the Invoice number");
          } else if (data.message == "Invoice created successfully") {
            this.getdata.notify("New Invoice Details has been Added Successfully");
            this.router.navigateByUrl("/dashbord/invoicelist")
            this.Invoice();
          }
        },
          Error => {
          });
    }
  }
  // Click To Cancel Data
  Cancel() {
    this.router.navigate(['/dashbord/invoicelist']);
  }
  // Droptown Product Name
  // prod_index: any
  // products(index) {
  //   this.prod_index = index
  //   var list = this.product_details[index]
  //   var details = this.Newinvoice.value;
  //   this.pervalue = list.salerate
  //   details.hsncode = list.hsncode
  //   details.perbagvalue = list.salerate
  //   details.prodname = list.prodname
  //   details.totbagvalue = "";
  //   details.nettotal = "";
  //   details.cgst = "";
  //   details.sgst = "";
  //   details.subtotal = "";
  //   details.total = 0;
  //   details.tons = "";
  //   details.noofbags = "";
  //   details.discount = 0;
  //   this.cal = "";
  //   this.net_totel = "";
  //   this.gst1 = "";
  //   this.gst2 = "";
  //   this.tot = "";
  //   this.t_ton = "";
  //   this.ton = ""
  //   this.disc_tot = 0
  //   $(document).ready(() => {
  //     $('[name=options]').val(index);
  //   });
  //   this.Newinvoice.patchValue(details);
  //   console.log(this.Newinvoice);
  // }
  // select No_Bags_Value
  input_event(value) {
    this.nobag = value.length
    if (this.nobag == 0) {
      this.cal = "";
      this.net_totel = "";
      this.gst1 = "";
      this.gst2 = "";
      this.tot = 0;
      this.t_ton = "";
      this.ton = "";
      this.disc_tot = 0
      var details = this.Newinvoice.value;
      details.totbagvalue = "";
      details.nettotal = "";
      details.cgst = "";
      details.sgst = "";
      details.subtotal = "";
      details.total = 0;
      details.noofbags = "";
      details.discount = 0;
      this.Newinvoice.patchValue(details);
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    } else {
      this.cal = this.pervalue * value
      this.ton = this.ton_tot * value
      this.tot = this.cal - this.disc_tot
      var gis = this.gist
      this.cgst = this.tot * gis
      this.sgst = this.tot * gis
      this.net_gst = this.tot + this.cgst + this.sgst;
      this.gst1 = this.cgst.toFixed(2);
      this.gst2 = this.sgst.toFixed(2);
      this.net_totel = this.net_gst
      this.t_ton = this.ton.toFixed(2);
      var givedata = this.Newinvoice.value
      givedata.totbagvalue = this.cal
      givedata.nettotal = this.net_totel
      givedata.cgst = this.gst1
      givedata.sgst = this.gst2
      givedata.subtotal = this.tot
      givedata.total = this.tot
      givedata.tons = this.t_ton
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
      this.Newinvoice.patchValue(givedata);
    }
  }
  // select No_Discount_Value
  discount_event(value) {
    this.disc_tot = value
    if (this.disc_tot < this.cal) {
      this.tot = this.cal - this.disc_tot
      var gis = this.gist
      this.cgst = this.tot * gis
      this.sgst = this.tot * gis
      this.net_gst = this.tot + this.cgst + this.sgst;
      this.gst1 = this.cgst.toFixed(2);
      this.gst2 = this.sgst.toFixed(2);
      this.net_totel = this.net_gst
      this.t_ton = this.ton.toFixed(2);
      var givedata = this.Newinvoice.value
      givedata.totbagvalue = this.cal
      givedata.nettotal = this.net_totel
      givedata.cgst = this.gst1
      givedata.sgst = this.gst2
      givedata.subtotal = this.tot
      givedata.total = this.tot
      givedata.tons = this.t_ton
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
      this.Newinvoice.patchValue(givedata);
    } else if (this.disc_tot >= this.cal) {
      this.cal = "";
      this.net_totel = "";
      this.gst1 = "";
      this.gst2 = "";
      this.tot = 0;
      this.t_ton = "";
      this.ton = "";
      this.disc_tot = 0
      var details = this.Newinvoice.value;
      details.totbagvalue = "";
      details.nettotal = "";
      details.cgst = "";
      details.sgst = "";
      details.subtotal = "";
      details.total = "";
      details.noofbags = "";
      details.discount = 0;
      this.Newinvoice.patchValue(details);
      this.getdata.notify('Please check the amount details');
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    }
  }
  //  Select Customer_Type 
  checkbox(value) {
    this.SEARCH = "search"
    this.chkvalu = value
    this.empyt();

    // $(document).ready(() => {
    //   $('[name=options]').val(this.prod_index);
    // });
    console.log(value)
    $("#selectcustomer").hide()
    this.cus_name.splice(value, 1);
  }
  empyt() {
    var empty = this.Newinvoice.value
    empty.custid = "";
    empty.gstin = "";
    empty.address = ""
    empty.mobnumber1 = ""
    empty.mobnumber2 = ""
    empty.branchid = ""
    this.Newinvoice.patchValue(empty);
  }
  // Select Customer Name
  Customer_List = [];
  subdealer = [];
  cus_o_sub = [];
  walk_i_cus = [];
  cus_name: any;
  get_Cus_id
  custom: any
  customer_I
  customer_N
  ChangeCUSTOMER(val) {
    var map = {}
    for (let i = 0; i < this.cus_name.length; i++) {
      map[this.cus_name[i]._id] = this.cus_name[i].name
      var emtobj = this.cus_name[i]
      var id = this.cus_name[i]._id
      if (emtobj._id == val) {
        var stroeObj = emtobj
      }
    }
    stroeObj.gstin = stroeObj.gstin
    stroeObj.address = stroeObj.address
    stroeObj.mobnumber1 = stroeObj.mobnumber
    stroeObj.mobnumber2 = stroeObj.mobnumber1
    this.customer_N = map[val]
    this.customer_I = val
    $("#customername").val(this.customer_N)
    $("#selectcustomer").hide()
    stroeObj.custid = this.customer_N
    this.Newinvoice.patchValue(stroeObj)
  }
  // Search Customer Name
  search_custype(value) {
    if (value.length == 0) {
      var empty = this.Newinvoice.value
      empty.gstin = "";
      empty.address = ""
      empty.mobnumber1 = ""
      empty.mobnumber2 = ""
      this.customer_I = ""
      $("#selectcustomer").hide()
      this.Newinvoice.patchValue(empty);
      this.case_error = ""
    } else {
      var reqdata= "&searchstr=" + value + '&type=' + this.chkvalu + "&page=" + 1 + "&pageLimit=" + 10
      return this.makeapi.method(this.CustomerListapi, reqdata, "post")
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
          // $(document).ready(() => {
          //   $('[name=options]').val(this.prod_index);
          // });
        },
          Error => {
          });
    }
  }
  // Check Case_Type
  checkbox1(value) {
    this.Cash = value
    this.Cheque = undefined
    this.modelbtn = "CASE1"
    var getform = this.Newinvoice.value
    getform.chequedate = '',
      getform.bankname = '',
      getform.chequenumber = '',
      getform.chequeamount = ''
  }
  // Check Cheque_Type
  checkbox2(value) {
    this.Cash = undefined
    this.Cheque = value
    this.modelbtn = "Cheque"
    var getform = this.Newinvoice.value
    getform.cashamount = ''
  }
  case_amt: any;
  // Select Case_Amount  
  input_case_amt(value) {
    this.case_amt = value
    this.net_totel
    console.log(this.net_totel)
    if (this.case_amt < this.net_totel) {
      // this.case_amt = value
      var casedata = this.Newinvoice.value
      casedata.cashamount = this.case_amt
      this.Newinvoice.patchValue(casedata);

      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    } else if (this.case_amt > this.net_totel) {
      this.case_amt = "";
      var casedata = this.Newinvoice.value
      casedata.cashamount = "";
      this.Newinvoice.patchValue(casedata);

      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
      this.getdata.notify('Your Case amount is invalid');
    }

  }
  // Select Cheque_Amount  
  cheque_amt: any
  input_cheque_amt(value) {
    this.cheque_amt = value
    this.net_totel

    console.log(this.net_totel)
    if (this.cheque_amt < this.net_totel) {
      // this.case_amt = value
      var casedata = this.Newinvoice.value
      casedata.chequeamount = this.cheque_amt
      this.Newinvoice.patchValue(casedata);

      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    } else if (this.cheque_amt > this.net_totel) {
      this.cheque_amt = "";
      var casedata = this.Newinvoice.value
      casedata.chequeamount = "";
      this.Newinvoice.patchValue(casedata);

      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
      this.getdata.notify('Your Cheque amount is invalid');
    }
  }
  // Form validation
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  branch_id
  branch_name: any;
  pending_list: any;
  case_error1: any
  branch_I
  branch_N
  // Select Branch Name
  Change_BRANCH(val) {
    var map = {}
    for (let i = 0; i < this.branch_name.length; i++) {
      map[this.branch_name[i]._id] = this.branch_name[i].branchname
      var emtobj = this.branch_name[i]
      if (emtobj._id == this.branch_name[i]._id) {
        var stroeObj = emtobj
      }
    }
    stroeObj.gstin = stroeObj.gstin
    stroeObj.address = stroeObj.address
    stroeObj.mobnumber1 = stroeObj.mobnumber
    stroeObj.mobnumber2 = stroeObj.mobnumber1
    this.branch_N = map[val]
    this.branch_I = val
    $("#branchname").val(this.branch_N)
    $("#selectbranch").hide()
    stroeObj.branchid = this.branch_N
    this.Newinvoice.patchValue(stroeObj)
  }
  // Search Branch Name
  search_brenchtype(value) {
    if (value.length == 0) {
      var empty = this.Newinvoice.value
      this.branch_name.splice(value, 1);
      this.branch_name = []
      $("#selectbranch").hide()
      this.Newinvoice.patchValue(empty);
      this.case_error1 = ""
    } else {
      var reqdata = "searchstr=" + value
      return this.makeapi.method(this.BranchListapi, reqdata, "post")
        .subscribe(data => {
          this.branch_name = data;
          if (data.length > 0) {
            this.case_error1 = ""
            $("#selectbranch").slideDown()
          } else if (data.length == 0) {
            this.case_error1 = "case_error1"
            $("#selectbranch").hide()
          }
          // $(document).ready(() => {
          //   $('[name=options]').val(this.prod_index);
          // });

        },
          Error => {
          });
    }
  }
//  Select product Name
product_I
product_N
case_error2:any
Changeprodname(val) {
  var map = {}
  for (let i = 0; i < this.product_details.length; i++) {
    map[this.product_details[i]._id] = this.product_details[i].prodname
    var emtobj = this.product_details[i]
    if (emtobj._id == val) {
      var stroeObj = emtobj
    }
  }
  this.product_N = map[val]
  this.product_I = val
  this.pervalue = stroeObj.salerate
  $("#productid").val(this.product_N)
  // $("#productRate").val(stroeObj.purchaserate)
  $("#product_name").hide()
  var getform = this.Newinvoice.value
  getform.prodname = this.product_N
  getform.perbagvalue = stroeObj.salerate
  getform.hsncode = stroeObj.hsncode
  getform.discount=this.disc_tot
  this.Newinvoice.patchValue(getform)
  debugger
}
// Search Branch Name
search_prodtype(value) {
  if (value.length == 0) {
    var empty = this.Newinvoice.value
    this.product_details.splice(value, 1);
    this.product_details = []
    $("#product_name").hide()
    this.Newinvoice.patchValue(empty);
    this.case_error2 = ""
    var details = this.Newinvoice.value;    
    details.totbagvalue = "";
    details.nettotal = "";
    details.cgst = "";
    details.sgst = "";
    details.subtotal = "";
    details.total = "";
    details.tons = "";
    details.noofbags = "";
    details.discount = 0;
    details.perbagvalue=""
    details.hsncode=""
    this.cal = "";
    this.net_totel = "";
    this.gst1 = "";
    this.gst2 = "";
    this.tot = "";
    this.t_ton = "";
    this.ton = ""
    this.disc_tot = 0
    $(document).ready(() => {
      $('[name=options]').val(value);
    });
    this.Newinvoice.patchValue(details);
  } else {
    var reqdata ="searchstr="+ value + "&page=" + 1 + "&pageLimit=" + 10
    return this.makeapi.method(this.ProductListapi, reqdata, "post")
      .subscribe(data => {
        // this.branch_name = data;
        this.product_details = data;
        if (data.length > 0) {
          $("#product_name").slideDown()
          this.case_error2 = ""
          // this.prod_index = value
          // var list = this.product_details[value]
          // var details = this.Newpurchase.value;
          // this.pervalue = list.purchaserate
          // details.perbagvalue = list.purchaserate
          // details.prodname = list.prodname
        } else if (data.length == 0) {
          this.case_error2 = "case_error3"
          $("#produc_tname").hide()
        }
        // $(document).ready(() => {
        //   $('[name=options]').val(this.prod_index);
        // });

        // this.case_error = ""
        // if (data.length > 0) {
        //   this.branch_id = this.branch_name[0]._id
        //   $("#selectioncd2").slideDown()
        //   this.case_error = ""
        // } else if (data.length == 0) {
        //   this.branch_name.splice(value, 1);
        //   this.case_error = "case_error"
        //   $("#selectioncd2").hide()
        // }

      },
        Error => {
        });
  }
 
}
}
