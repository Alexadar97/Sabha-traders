import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatatransferService } from '../../services/datatransfer.service';
import { WebserviceService } from '../../services/webservice.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { NgxCurrencyModule } from "ngx-currency";
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { empty } from 'rxjs';
declare var $, moment, require: any;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css', 'new-purchase-768px.css']
})
export class NewPurchaseComponent implements OnInit {
  today: string;
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
  get invoicenum() {
    return this.Newpurchase.get('invoicenum');
  }
  get date() {
    return this.Newpurchase.get('date');
  }
  get supname() {
    return this.Newpurchase.get('suppname');
  }
  get gstinum() {
    return this.Newpurchase.get('suppgstin');
  }
  get address() {
    return this.Newpurchase.get('address');
  }
  get mblnum1() {
    return this.Newpurchase.get('mobnumber1');
  }
  get mblnum2() {
    return this.Newpurchase.get('mobnumber2');
  }
  get vehnum() {
    return this.Newpurchase.get('vehnumber');
  }
  get prodescri() {
    return this.Newpurchase.get('prodname');
  }
  get hsncode() {
    return this.Newpurchase.get('hsncode');
  }
  get discount() {
    return this.Newpurchase.get('discount');
  }
  get nfbags() {
    return this.Newpurchase.get('noofbags');
  }
  get tons() {
    return this.Newpurchase.get('tons');
  }
  get pbv() {
    return this.Newpurchase.get('perbagvalue');
  }
  get val_total() {
    return this.Newpurchase.get('total');
  }
  get branch() {
    return this.Newpurchase.get('branchid');
  }
  Newpurchase: FormGroup
  // API Call    
  // checkLimit:any;
  private PurchaseSaveapi = this.getdata.appconstant + 'purchase/save';
  private ProductListapi = this.getdata.appconstant + 'product/list';
  private BranchListapi = this.getdata.appconstant + 'branch/list';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef, private _pur: PurhasedataService) {

    this.Newpurchase = this.fb.group({
      'invoicenum': [null, Validators.compose([Validators.required])],
      'branchid': ['', Validators.compose([Validators.required])],
      'date': [null, Validators.compose([Validators.required])],
      'suppname': [null, Validators.compose([Validators.required])],
      'suppgstin': [null, Validators.compose([Validators.required])],
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
      'discount': [null],
      'noofbags': [null, Validators.compose([Validators.required])],
      'tons': [null, Validators.compose([Validators.required])],
      'totbagvalue': [null, Validators.compose([Validators.required])],
      'perbagvalue': [null, Validators.compose([Validators.required])],
      'total': [null, Validators.compose([Validators.required])],
    })
  }
  branchid: any
  usertype: any
  ngOnInit() {
    this._pur.Decimal();
    // this.pro_det();
    this.branchid = localStorage.getItem("branchid");
    this.usertype = localStorage.getItem("usertype")
  }
  // List Product Name
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
  // Click Submit  
  Submit_Purchase() {
    var getform = this.Newpurchase.value
    var date = $("#Date").val()
    // getform.date = moment(date).format('DD-MM-YYYY');
    getform.date = date
    if ((this.Newpurchase.invalid) || (getform.invoicenum.trim() == '') || (getform.vehnumber.trim() == '')
      || (getform.suppname.trim() == '') || (getform.address.trim() == '')) {
      this.markFormGroupTouched(this.Newpurchase);
      console.log(this.Newpurchase);
      this.getdata.notify('Form is Invalid');

    } else {
      var getform = this.Newpurchase.value
      var data = {
        "branchid": this.changevalcd, "invoicenum": getform.invoicenum, "date": getform.date, "suppname": getform.suppname, "suppgstin": getform.suppgstin,
        "address": getform.address, "mobnumber1": getform.mobnumber1, "mobnumber2": getform.mobnumber2, "vehnumber": getform.vehnumber, "subtotal": getform.subtotal, "sgst": getform.sgst,
        "cgst": getform.cgst, "nettotal": getform.nettotal,
        products: [{
          // getform.prodid
          "prodid": this.product_I ,
          "prodname": getform.prodname, "hsncode": getform.hsncode, "discount": getform.discount, "noofbags": getform.noofbags,
          "tons": getform.tons, "totbagvalue": getform.totbagvalue, "perbagvalue": getform.perbagvalue, "total": getform.total
        }]
      }
      var reqdata = "purchaseDetails=" + JSON.stringify(data)
      return this.makeapi.method(this.PurchaseSaveapi, reqdata, "post")
        .subscribe(data => {
          if (data.message == "Purchase already exists") {
            // $(document).ready(() => {
            //   $('[name=options]').val(this.prod_index);
            // });
            this.getdata.notify("Please Check the Invoice number");
          } else if (data.message == "Purchase created successfully") {
            this.getdata.notify('New Purchase Details has been Added Successfully');
            this.router.navigateByUrl("/dashbord/purchaselist")
            this.Purchase()
          }
        },
          Error => {
          });

    }
  }
  // Click To Cancel Data
  Cancel() {
    this.router.navigate(['/dashbord/purchaselist']);
  }
  // Product Change Event
  // prod_index: any
  // products(index) {
  //   this.prod_index = index
  //   var list = this.product_details[index]
  //   var details = this.Newpurchase.value;
  //   this.pervalue = list.purchaserate
  //   details.hsncode = list.hsncode
  //   details.perbagvalue = list.purchaserate
  //   details.prodname = list.prodname
  //   details.totbagvalue = "";
  //   details.nettotal = "";
  //   details.cgst = "";
  //   details.sgst = "";
  //   details.subtotal = "";
  //   details.total = "";
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
  //   this.Newpurchase.patchValue(details);
  //   console.log(this.Newpurchase);
  // }
  // Input No_Bags
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
      var details = this.Newpurchase.value;
      details.totbagvalue = "";
      details.nettotal = "";
      details.cgst = "";
      details.sgst = "";
      details.subtotal = "";
      details.total = 0;
      details.noofbags = "";
      details.discount = 0;
      this.Newpurchase.patchValue(details);
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
      this.net_totel = this.net_gst.toFixed(2);
      this.t_ton = this.ton.toFixed(2);
      var givedata = this.Newpurchase.value
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
      this.Newpurchase.patchValue(givedata);
    }
  
  }
  // Input Discount Value
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
      this.net_totel = this.net_gst.toFixed(2);
      this.t_ton = this.ton.toFixed(2);
      var givedata = this.Newpurchase.value
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
      this.Newpurchase.patchValue(givedata);
    } else if (this.disc_tot >= this.cal) {
      this.cal = "";
      this.net_totel = "";
      this.gst1 = "";
      this.gst2 = "";
      this.tot = "";
      this.t_ton = "";
      this.ton = "";
      this.disc_tot = 0
      var details = this.Newpurchase.value;
      details.totbagvalue = "";
      details.nettotal = "";
      details.cgst = "";
      details.sgst = "";
      details.subtotal = "";
      details.total = "";
      details.noofbags = "";
      details.discount = 0;
      this.Newpurchase.patchValue(details);
      this.getdata.notify('Please check the amount details');
      // $(document).ready(() => {
      //   $('[name=options]').val(this.prod_index);
      // });
    }
  }
  branch_id
  branch_name: any;
  pending_list: any;
  case_error: any
  custom: any
  changevalcd
  branch_N
  //  Select Branch Name
  Changeselectcd5(val) {
    var map = {}
    for (let i = 0; i < this.branch_name.length; i++) {
      map[this.branch_name[i]._id] = this.branch_name[i].branchname
      var emtobj = this.branch_name[i]
      if (emtobj._id == this.branch_name[i]._id) {
        var stroeObj = emtobj
      }
    }
    this.branch_N = map[val]
    this.changevalcd = val
    $("#servidcd2").val(this.branch_N)
    $("#selectioncd2").hide()
    stroeObj.branchid = this.branch_N
    this.Newpurchase.patchValue(stroeObj)
  }
  // Search Branch Name
  search_brenchtype(value) {
    if (value.length == 0) {
      var empty = this.Newpurchase.value
      this.branch_name.splice(value, 1);
      this.branch_name = []
      $("#selectioncd2").hide()
      this.Newpurchase.patchValue(empty);
      this.case_error = ""
    } else {
      var reqdata = "searchstr=" + value
      return this.makeapi.method(this.BranchListapi, reqdata, "post")
        .subscribe(data => {
          // this.branch_name = data;
          this.branch_name = data;
          if (data.length > 0) {
            this.case_error = ""
            $("#selectioncd2").slideDown()
          } else if (data.length == 0) {
            this.case_error = "case_error1"
            $("#selectioncd2").hide()
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
  // Form Validators
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
//  Select product Name
product_I
product_N
case_error1:any
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
  this.pervalue = stroeObj.purchaserate
  $("#productid").val(this.product_N)
  // $("#productRate").val(stroeObj.purchaserate)
  $("#product_name").hide()
  var getform = this.Newpurchase.value
  getform.prodname = this.product_N
  getform.perbagvalue = stroeObj.purchaserate
  getform.hsncode = stroeObj.hsncode
  this.Newpurchase.patchValue(getform)
}
// Search Branch Name
search_prodtype(value) {
  if (value.length == 0) {
    var empty = this.Newpurchase.value
    this.product_details.splice(value, 1);
    this.product_details = []
    $("#product_name").hide()
    this.Newpurchase.patchValue(empty);
    this.case_error1 = ""
    var details = this.Newpurchase.value;    
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
    this.Newpurchase.patchValue(details);
  } else {
    var reqdata ="searchstr="+ value + "&page=" + 1 + "&pageLimit=" + 10
    return this.makeapi.method(this.ProductListapi, reqdata, "post")
      .subscribe(data => {
        // this.branch_name = data;
        this.product_details = data;
        if (data.length > 0) {
          $("#product_name").slideDown()
          this.case_error1 = ""
        
          // this.prod_index = value
          // var list = this.product_details[value]
          // var details = this.Newpurchase.value;
          // this.pervalue = list.purchaserate
          // details.perbagvalue = list.purchaserate
          // details.prodname = list.prodname
        } else if (data.length == 0) {
          this.case_error1 = "case_error2"
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