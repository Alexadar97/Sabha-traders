import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UpperCasePipe } from '@angular/common';
import { updateClassProp } from '@angular/core/src/render3/styling';
declare var $, moment, require: any;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css', 'download-768px.css']
})
export class DownloadComponent implements OnInit {
  checkvale = false
  checkvale1 = false
  checkvale2 = false
  Customer_List = [];
  cus_name: any;
  subdler = [];
  get_Cus_id = "";
  Salesreport: FormGroup
  Purchasereport: FormGroup
  Paymentreport: FormGroup
  private GenerateFile = this.getdata.appconstant
  // private PurchaseDownloadapi = this.getdata.appconstant + 'purchase/generateFile';
  // private PaymentDownloadapi = this.getdata.appconstant + 'payment/generateFile';
  private CustomerListapi = this.getdata.appconstant + 'customer/list';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute, private _pur: PurhasedataService) {
    this.Salesreport = this.fb.group({
      _id: null,
      fromDate: [''],
      toDate: [''],
      fileFormat: [''],
      custid: [''],
    })
    this.Purchasereport = this.fb.group({
      _id: null,
      fromDate: [''],
      toDate: [''],
      fileFormat: [''],
      custid: [''],
    })
    this.Paymentreport = this.fb.group({
      _id: null,
      fromDate: [''],
      toDate: [''],
      fileFormat: [''],
      custid: [''],
    })
  }

  ngOnInit() {
    this.checksales(true)
    this.checkpurchase(true)
    this.checkpayment(true)
  }
  // Sales Report
  // On_Click Function
  onsales() {
    this.filepath = ""
    $("#checked1").prop("checked", true);
    this.progressing = false
    this.value = 0
    this.report = false
    this.status = "all"
    this.fileFormat = null
    $("#sales-report").modal("show")
    this.sel_cus = ""
    this.Salesreport.reset()
    $(document).ready(function () {
      $("#btn-one").removeClass("active-btn");
    });
    $(document).ready(function () {
      $("#btn-two").removeClass("active-btn");
    });
  }
  // Check_Function
  sel_cus: any
  checksales(value) {
    this.checkvale = value
    if (this.checkvale == true) {
      this.status = 'all'
      this.changevalcd1 = ""
      this.sel_cus = ""
      var data = this.Salesreport.value
      data.custid = ""
      this.Salesreport.patchValue(data)
      $("#servidcd1").val('')
    } else if (this.checkvale == false) {
      this.sel_cus = "sel_cus"
      this.status = 'single'
    }
  }
  // File_Formet
  fileFormat: any
  format: any
  salesformet(value) {
    if (value == 1) {
      this.fileFormat = 'pdf'
      this.format = ".pdf"
      $(document).ready(function () {
        $("#btn-one").addClass("active-btn");
      });
      $(document).ready(function () {
        $("#btn-two").removeClass("active-btn");
      });
    } else if (value == 2) {
      this.fileFormat = 'xlsx'
      this.format = ".xlsx"
      $(document).ready(function () {
        $("#btn-two").addClass("active-btn");
      });
      $(document).ready(function () {
        $("#btn-one").removeClass("active-btn");
      });
    }
  }
  // Search_Funtion
  search_sales(value) {
    if (value.length == 0) {
      this.cus_name = []
      $("#selectioncd1").hide()
    } else {
      if (this.Customer_List.indexOf(value) != -1) {
        var data = this.cus_name[this.Customer_List.indexOf(value)];
        var getcusnamedata = this.Salesreport.value;
        getcusnamedata.custid = data.custid;
        this.Salesreport.patchValue(getcusnamedata);
        this.cus_name = []
        $("#selectioncd1").hide()
      }
      else {
        this.Customer_List = [];
        var reqdata = "searchstr=" + value + "&page=" + 1 + "&pageLimit=" + 10
        return this.makeapi.method(this.CustomerListapi, reqdata, "post")
          .subscribe(data => {
            this.cus_name = data;
            if (data.length > 0) {
              this.get_Cus_id = this.cus_name[0]._id
              $("#selectioncd1").slideDown();
            } else if (data.length == 0) {
              $("#selectioncd1").hide()
            }
          },

            Error => {
            });
      }
    }
  }
  // Sales Report Generate
  report = false
  downloadAPI: any
  downloadData: any
  GenerateAPI: any
  timeout: any
  sales_generate(filename) {
    var data = []
    this.Salesreport.patchValue(data)
    var getdata = this.Salesreport.value
    var fromDate = $("#fromDate1").val()
    var toDate = $("#toDate1").val()
    getdata.fromDate = fromDate
    getdata.toDate = toDate
    getdata.fileFormat = this.fileFormat
    getdata.status = this.status
    getdata.custid = this.changevalcd1
    // getdata.fromDate=moment(fromDate).format('DD-MM-YYYY');
    // getdata.toDate=moment(toDate).format('DD-MM-YYYY');
    // this.Salesreport.patchValue(getdata)
    if (this.Salesreport.invalid || getdata.fromDate == "Invalid date" || getdata.toDate == "Invalid date" || getdata.fromDate == null || getdata.toDate == null || getdata.fileFormat == null) {
      this.getdata.notify('Form is Invalid');
      this.markFormGroupTouched(this.Salesreport);
    } else {
      this.GenerateAPI = "invoice/generateFile"
      this.downloadAPI = "invoice/download"
      var getform = this.Salesreport.value
      this.downloadData = "fromDate=" + getform.fromDate + "&toDate=" + getform.toDate + "&status=" + this.status + "&fileFormat=" + getform.fileFormat + "&custid=" + this.changevalcd1;
      this.report_generate()
    }
  }
  // Purchase Report Generate
  purchase_report(filename) {
    var getdata = this.Purchasereport.value
    var fromDate = $("#fromDate2").val()
    var toDate = $("#toDate2").val()
    getdata.fromDate = fromDate
    getdata.toDate = toDate
    getdata.fileFormat = this.fileFormat
    getdata.status = this.status
    getdata.custid = this.changevalcd2
    // getdata.fromDate=moment(fromDate).format('DD-MM-YYYY');
    // getdata.toDate=moment(toDate).format('DD-MM-YYYY');
    // this.Purchasereport.patchValue(getdata)
    if (this.Purchasereport.invalid || getdata.fromDate == "Invalid date" || getdata.toDate == "Invalid date" || getdata.fromDate == null || getdata.toDate == null || getdata.fileFormat == null) {
      this.getdata.notify('Form is Invalid');
      this.markFormGroupTouched(this.Purchasereport);
    } else {
      this.GenerateAPI = "purchase/generateFile"
      this.downloadAPI = "purchase/download"
      var getform = this.Purchasereport.value
      this.downloadData = "fromDate=" + getform.fromDate + "&toDate=" + getform.toDate + "&status=" + this.status + "&fileFormat=" + getform.fileFormat + "&custid=" + this.changevalcd2;
      this.report_generate()
    }
  }
  filepath: any
  // Payment Report Generate
  payment_report(filename) {
    var getdata = this.Paymentreport.value
    var fromDate = $("#fromDate3").val()
    var toDate = $("#toDate3").val()
    getdata.fromDate = fromDate
    getdata.toDate = toDate
    getdata.fileFormat = this.fileFormat
    getdata.status = this.status
    getdata.custid = this.changevalcd3
    // getdata.fromDate=moment(fromDate).format('DD-MM-YYYY');
    // getdata.toDate=moment(toDate).format('DD-MM-YYYY');
    //  this.Paymentreport.patchValue(getdata)
    if (this.Paymentreport.invalid || getdata.fromDate == "Invalid date" || getdata.toDate == "Invalid date" || getdata.fromDate == null || getdata.toDate == null || getdata.fileFormat == null) {
      this.getdata.notify('Form is Invalid');
      this.markFormGroupTouched(this.Paymentreport);
    } else {
      this.GenerateAPI = "payment/generateFile"
      this.downloadAPI = "payment/download"
      var getform = this.Paymentreport.value
      this.downloadData = "fromDate=" + getform.fromDate + "&toDate=" + getform.toDate + "&status=" + this.status + "&fileFormat=" + getform.fileFormat + "&custid=" + this.changevalcd3;
      this.report_generate()
    }
  }
  // Report Generate
  report_generate() {
    return this.makeapi.method(this.GenerateFile + this.GenerateAPI, this.downloadData, "post")
      .subscribe(data => {
        if (data.status == "success") {
          this.filepath = data.filepath
          this.timeout = setInterval(() => {
            this.progress();
          }, 80);
        } else {
          this.getdata.notify(data.status + ' ' + '!!');
        }
      },
        Error => {
        });
  }

  // Download Report
  downlaod_report(filename) {
    if (this.report == true) {
      var reqdata = "filepath=" + this.filepath
      return this.makeapi.method(this.GenerateFile + this.downloadAPI, reqdata, "filedownlaod")
        .subscribe(res => {
          this.value = 0
          this.fileFormat = ""
          this.sel_cus = ""
          $("#checked1").prop("checked", true);
          $("#checked2").prop("checked", true);
          $("#checked3").prop("checked", true);
          this.Salesreport.reset()
          this.Purchasereport.reset()
          this.Paymentreport.reset()
          res.filename = filename
          $("#sales-report").modal("hide")
          $("#purchase-report").modal("hide")
          $("#payment-report").modal("hide")
          if (window.navigator.msSaveOrOpenBlob) {
            var fileData = [res.data];
            var blobObject = new Blob(fileData);
            window.navigator.msSaveOrOpenBlob(blobObject, filename);
            window.navigator.msSaveOrOpenBlob(blobObject, filename);

          } else {
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = res.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
          }

        },
          Error => {
          });

    }

    else {
      this.getdata.notify('Please Generate Report');
    }

  }


  // Purchase_Report
  // On_Click Function
  status = 'all'
  onpurchase() {
    this.filepath = ""
    $("#checked2").prop("checked", true);
    this.progressing = false
    this.value = 0
    this.report = false
    this.status = "all"
    this.fileFormat = null
    $("#purchase-report").modal("show")
    this.sel_cus = ""
    this.Purchasereport.reset()
    $(document).ready(function () {
      $("#btn-one1").removeClass("active-btn1");
    });
    $(document).ready(function () {
      $("#btn-two1").removeClass("active-btn1");
    });
  }
  // Check_Function
  checkpurchase(value) {
    this.checkvale1 = value
    if (this.checkvale1 == true) {
      this.sel_cus = ""
      this.status = 'all'
      this.changevalcd2 = ""
      var data = this.Purchasereport.value
      data.custid = ""
      this.Purchasereport.patchValue(data)
    } else if (this.checkvale1 == false) {
      this.sel_cus = "sel_cus"
      this.status = 'single'
    }
  }
  // File_Formet
  purchaseformet(value) {
    if (value == 1) {
      this.fileFormat = 'pdf'
      this.format = ".pdf"
      $(document).ready(function () {
        $("#btn-one1").addClass("active-btn1");
      });
      $(document).ready(function () {
        $("#btn-two1").removeClass("active-btn1");
      });
    } else if (value == 2) {
      this.fileFormat = 'xlsx'
      this.format = ".xlsx"
      $(document).ready(function () {
        $("#btn-two1").addClass("active-btn1");
      });
      $(document).ready(function () {
        $("#btn-one1").removeClass("active-btn1");
      });
    }
  }
  // Search_Funtion
  search_purchase(value) {
    if (value.length == 0) {
      this.cus_name = []
      $("#selectioncd2").hide()
    } else {
      if (this.Customer_List.indexOf(value) != -1) {
        var data = this.cus_name[this.Customer_List.indexOf(value)];
        var getcusnamedata = this.Purchasereport.value;
        getcusnamedata.custid = data.custid;
        this.Purchasereport.patchValue(getcusnamedata);
        $("#selectioncd2").hide()
      }
      else {
        this.Customer_List = [];
        var reqdata = "searchstr=" + value + "&page=" + 1 + "&pageLimit=" + 10
        return this.makeapi.method(this.CustomerListapi, reqdata, "post")
          .subscribe(data => {
            this.cus_name = data;
            if (data.length > 0) {
              this.get_Cus_id = this.cus_name[0]._id
              $("#selectioncd2").slideDown();
            } else if (data.length == 0) {
              $("#selectioncd2").hide()
            }
          },
            Error => {
            });
      }
    }
  }

  // Payment_Report
  // On_Click Function
  onpayment() {
    this.filepath = ""
    $("#checked3").prop("checked", true);
    this.progressing = false
    this.value = 0
    this.report = false
    this.status = "all"
    this.fileFormat = null
    $("#payment-report").modal("show")
    this.sel_cus = ""
    this.Paymentreport.reset()
    $(document).ready(function () {
      $("#btn-one2").removeClass("active-btn2");
    });
    $(document).ready(function () {
      $("#btn-two2").removeClass("active-btn2");
    });
  }
  // Check_Function   
  search_show: any
  checkpayment(value) {
    this.checkvale2 = value
    if (this.checkvale2 == true) {
      this.sel_cus = ""
      this.status = 'all'
      this.changevalcd3 = ""
      var data = this.Paymentreport.value
      data.custid = ""
      this.Paymentreport.patchValue(data)
    } else if (this.checkvale2 == false) {
      this.sel_cus = "sel_cus"
      this.status = 'single'
    }
  }
  // File_Formet
  paymentformet(value) {
    if (value == 1) {
      this.fileFormat = 'pdf'
      this.format = ".pdf"
      $(document).ready(function () {
        $("#btn-one2").addClass("active-btn2");
      });
      $(document).ready(function () {
        $("#btn-two2").removeClass("active-btn2");
      });

    } else if (value == 2) {
      this.fileFormat = 'xlsx'
      this.format = ".xlsx"
      $(document).ready(function () {
        $("#btn-two2").addClass("active-btn2");
      });
      $(document).ready(function () {
        $("#btn-one2").removeClass("active-btn2");
      });
    }
  }

  // Search_Funtion
  search_payment(value) {
    if (value.length == 0) {
      this.cus_name = []
      $("#selectioncd3").hide()
    } else {
      if (this.Customer_List.indexOf(value) != -1) {
        var data = this.cus_name[this.Customer_List.indexOf(value)];
        var getcusnamedata = this.Paymentreport.value;
        getcusnamedata.custid = data.custid;
        this.Paymentreport.patchValue(getcusnamedata);
        $("#selectioncd3").hide()
      }
      else {
        this.Customer_List = [];
        var reqdata = "searchstr=" + value + "&page=" + 1 + "&pageLimit=" + 10
        return this.makeapi.method(this.CustomerListapi, reqdata, "post")
          .subscribe(data => {
            this.cus_name = data;
            if (data.length > 0) {
              this.get_Cus_id = this.cus_name[0]._id
              $("#selectioncd3").slideDown();
            } else if (data.length == 0) {
              $("#selectioncd3").hide()
            }
          },
            Error => {
            });
      }
    }
  }
  // VALIDATION
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Active btn
  //   act_btn(){
  //     var header = document.getElementById("myDIV");
  //     var btns = header.getElementsByClassName("pdf");
  //     var btns = header.getElementsByClassName("xls");
  //     for (var i = 0; i < btns.length; i++) {
  //     btns[i].addEventListener("click", function() {
  //     var current = document.getElementsByClassName("active");
  //     current[0].className = current[0].className.replace(" active", "");
  //     this.className += " active";
  //   });
  // }
  //   }


  // Progressing method
  value = 0
  progressing = false
  progress() {
    if (this.value < 100) {
      this.value++
      this.progressing = true
    } else {
      clearInterval(this.timeout)
      this.progressing = false
      this.report = true
      this.getdata.notify('Report Generated');
    }
  }
  changevalcd1: any
  Changeselectcd1(val) {
    var map = {}
    for (let i = 0; i < this.cus_name.length; i++) {
      map[this.cus_name[i]._id] = this.cus_name[i].name
      // var emtobj = this.cus_name[i]
      // var id = this.cus_name[i]._id
      // if (emtobj._id == val) {
      //   var stroeObj = emtobj
      // }
    }
    var changevalcd1 = map[val]
    this.changevalcd1 = val
    $("#servidcd1").val(changevalcd1)
    $("#selectioncd1").hide()
  }
  changevalcd2: any
  Changeselectcd2(val) {
    var map = {}
    for (let i = 0; i < this.cus_name.length; i++) {
      map[this.cus_name[i]._id] = this.cus_name[i].name
    }
    var changevalcd2 = map[val]
    this.changevalcd2 = val
    $("#servidcd2").val(changevalcd2)
    $("#selectioncd2").hide()
  }
  changevalcd3: any
  Changeselectcd3(val) {
    var map = {}
    for (let i = 0; i < this.cus_name.length; i++) {
      map[this.cus_name[i]._id] = this.cus_name[i].name
    }
    var changevalcd3 = map[val]
    this.changevalcd3 = val
    $("#servidcd3").val(changevalcd3)
    $("#selectioncd3").hide()
  }
}
