import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { NgxCurrencyModule } from "ngx-currency";
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import * as Highcharts from 'highcharts';

declare var $, moment;



@Component({
    selector: 'app-dashboard-data',
    templateUrl: './dashboard-data.component.html',
    styleUrls: ['./dashboard-data.component.css']
})
export class DashboardDataComponent implements OnInit {
    // public date: Date = new Date(Date.now());
    InvoiceForm: FormGroup
    // private dayFormatter = new Intl.DateTimeFormat("en", { weekday: "long" });
    // private monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });

    private produtNameAPI = this.getdata.appconstant + 'dashboard/productName';
    private productSalesAPI = this.getdata.appconstant + 'dashboard/productSales';
    private getYearAPI = this.getdata.appconstant + 'dashboard/getYear';
    private InvoiceEditAPI = this.getdata.appconstant + 'dashboard/invoice/get';
    private updatetAPI = this.getdata.appconstant + 'dashboard/invoice/update';
    private overAllSalesAPI = this.getdata.appconstant + 'dashboard/overAllSales';
    private InvoicePaginationapi = this.getdata.appconstant + 'dashboard/invoice/getPaginationCount';

    constructor(private fb: FormBuilder, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef) {
        this.InvoiceForm = fb.group({
            invoice: this.fb.array([]),
        });
    }
    selectedSideBar = 0
    p1 = 1
    currentDate: any
    loading=false
    pagecount = 0
    pagecount1 = 0
    ngOnInit() {
        var date = new Date()
        var cur_date = moment(date).format('DD-MM-YYYY');
        $("#Date1").val(cur_date)
        $("#Date2").val(cur_date)
        this.InvoiceDate(this.currentDate)
        this.salelsDate(this.salesCurrentDate)
        // this.monthForm = this.fb.group({
        //     months: []
        // });
        $(document).ready(() => {
            $('[name=year]').val(new Date().getFullYear());
        });
        this.grp_btn(1)
        this.ProductName()
        this.Year()
        this.selectedSideBar = 0
        this.loading = true;
        this.Pagination_Count();
        // this.Pagination_Count1()
    }

    // Product Wise SalesTrend

    productNameList = []
    ProductName() {
        return this.makeapi.method(this.produtNameAPI, "", "post")
            .subscribe(data => {
                this.productNameList = data
                this.produnctName = data[0]
                this.product_dashboard(data[0], 0)
            },
                Error => {
                });
    }
    produnctName: any
    product_dashboard(value, i) {
        $(document).ready(function () {
            $("#btn-one").addClass("active-btn");
        });
        $(document).ready(function () {
            $("#btn-two").removeClass("active-btn");
        });
        this.monthtrue = false
        this.produnctName = value
        this.monthvalue = ""
        this.yearvalue = ""
        this.year(new Date().getFullYear())

    }
    yearlist = []
    Year() {
        return this.makeapi.method(this.getYearAPI, "", "post")
            .subscribe(data => {
                this.yearlist = data
            },
                Error => {
                });
    }
    yearvalue: any
    monthForm;
    itmonths = []
    totalmonths() {
        this.itmonths = [{ "id": "1", "months": "January" }, { "id": "2", "months": "February" }, { "id": "3", "months": "March" }, { "id": "4", "months": "April" }, { "id": "5", "months": "May" },
        { "id": "6", "months": "June" }, { "id": "7", "months": "July" }, { "id": "8", "months": "August" }, { "id": "9", "months": "September" }, { "id": "10", "months": "October" }, { "id": "11", "months": "November" }, { "id": "12", "months": "December" }]

        var selectedMonth = new Date().getMonth();
        if (selectedMonth == 0) {
            selectedMonth = 12
        }
        selectedMonth = selectedMonth + 1;
        var selectedId;
        for (let i = 0; i < this.itmonths.length; i++) {
            var listObj = this.itmonths[i]
            if (listObj.id == selectedMonth) {
                selectedId = listObj.months;

            }
        }
        // this.monthForm = this.fb.group({
        //     months: [selectedId]
        // });
        $(document).ready(() => {
            $('[name=month]').val(selectedId);
          });
        this.month(selectedId)
    }
    monthvalue: any
    w1data: any
    w2data: any
    w3data: any
    w4data: any
    w5data: any
    w6data: any
    month(value) {
        this.monthvalue = value
        return this.makeapi.method(this.productSalesAPI, "year=" + this.yearvalue + "&month=" + this.monthvalue + "&type=" + "weekly" + "&prodname=" + this.produnctName, "post")
            .subscribe(data => {
                this.w1data = (data.weekly.W1)
                this.w2data = (data.weekly.W2)
                this.w3data = (data.weekly.W3)
                this.w4data = (data.weekly.W4)
                this.w5data = (data.weekly.W5)
                if (data.w6 != undefined) {
                    this.w6data = (data.W6.nettotal)
                } else {
                    this.w6data = 0
                }
                this.graph_week()
            },
                Error => {
                });
    }
    branchList = []
    m1data: any
    m2data: any
    m3data: any
    m4data: any
    m5data: any
    m6data: any
    m7data: any
    m8data: any
    m9data: any
    m10data: any
    m11data: any
    m12data: any
    year(value) {
        this.yearvalue = value
        return this.makeapi.method(this.productSalesAPI, "year=" + this.yearvalue + "&type=" + "monthly" + "&prodname=" + this.produnctName, "post")
            .subscribe(data => {
                this.branchList = []
                this.m1data = (data.monthly.M1)
                this.m2data = (data.monthly.M2)
                this.m3data = (data.monthly.M3)
                this.m4data = (data.monthly.M4)
                this.m5data = (data.monthly.M5)
                this.m6data = (data.monthly.M6)
                this.m7data = (data.monthly.M7)
                this.m8data = (data.monthly.M8)
                this.m9data = (data.monthly.M9)
                this.m10data = (data.monthly.M10)
                this.m11data = (data.monthly.M11)
                this.m12data = (data.monthly.M12)
                var key = (Object.keys(data.branch))
                var value = (Object.values(data.branch))
                var array = []
                array.push(key[0], value[0])
                for (let i = 0; i < key.length; i++) {
                    for (let j = 0; j < value.length; j++) {
                       
                    }
                    var emtobj2 = { name: key[i], value: value[i] }
                    this.branchList.push(emtobj2)
                }
                this.graph_month()
            },
                Error => {
                });

    }
    graph_month() {
        Highcharts.chart('container1', {
            chart: {
                type: 'column',
                height: 300,


            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category',
                categories: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                // tickInterval: 1000,
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }

            },

            tooltip: {
                pointFormat: 'Total Tons :<b>{point.value}</b> <br> Total Sales: <b>{point.y}</b>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },

            series: [
                {
                    name: "Series",
                    type: 'column',
                    colorByPoint: true,
                    data: [
                        {
                            name: "January",
                            y: Number(this.m1data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m1data.tons)
                        },
                        {
                            name: "February",
                            y: Number(this.m2data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m2data.tons)
                        },
                        {
                            name: "March",
                            y: Number(this.m3data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m3data.tons)
                        },
                        {
                            name: "April",
                            y: Number(this.m4data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m4data.tons)
                        },
                        {
                            name: "May",
                            y: Number(this.m5data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m5data.tons)
                        },
                        {
                            name: "June",
                            y: Number(this.m6data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m6data.tons)
                        },
                        {
                            name: "July",
                            y: Number(this.m7data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m7data.tons)
                        },
                        {
                            name: "August",
                            y: Number(this.m8data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m8data.tons)
                        },
                        {
                            name: "September",
                            y: Number(this.m9data.tons),
                            color: "#FF8A65",
                            value: Number(this.m9data.tons)
                        },
                        {
                            name: "October",
                            y: Number(this.m10data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m10data.tons)
                        },
                        {
                            name: "November",
                            y: Number(this.m11data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m11data.tons)
                        },
                        {
                            name: "December",
                            y: Number(this.m12data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.m12data.tons)
                        },
                    ],
                },

            ],

        });
    }
    graph_week() {
        Highcharts.chart('container1', {
            chart: {
                type: 'column',
                height: 300,


            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category',
                categories: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4',
                    'Week 5',
                    'Week 6',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                // tickInterval: 1000,
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }

            },

            tooltip: {
                pointFormat: 'Total Tons :<b>{point.value}</b> <br> Total Sales: <b>{point.y}</b>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },

            series: [
                {
                    name: "Series",
                    type: 'column',
                    colorByPoint: true,
                    data: [
                        {
                            name: "Week 1",
                            y: Number(this.w1data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w1data.tons)
                        },
                        {
                            name: "Week 2",
                            y: Number(this.w2data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w2data.tons)
                        },
                        {
                            name: "Week 3",
                            y: Number(this.w3data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w3data.tons)
                        },
                        {
                            name: "Week 4",
                            y: Number(this.w4data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w4data.tons)
                        },
                        {
                            name: "Week 5",
                            y: Number(this.w5data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w5data.tons)
                        },
                        {
                            name: "Week 6",
                            y: Number(this.w6data.nettotal),
                            color: "#FF8A65",
                            value: Number(this.w6data.tons)
                        },
                    ],

                },

            ],

        });
    }
    monthtrue = false
    grp_btn(value) {
        if (value == 1) {
            this.year(new Date().getFullYear())
            this.monthvalue = ""
            this.monthtrue = false
            $(document).ready(function () {
                $("#btn-one").addClass("active-btn");
            });
            $(document).ready(function () {
                $("#btn-two").removeClass("active-btn");
            });
        } else if (value == 2) {
            this.totalmonths()
            this.monthvalue = true
            $(document).ready(function () {
                $("#btn-two").addClass("active-btn");
            });
            $(document).ready(function () {
                $("#btn-one").removeClass("active-btn");
            });
        }

    }

    // Invoice Part

    get rowForms() {
        return this.InvoiceForm.get('invoice') as FormArray;
    }
    addRow(data) {
        var req = Validators.compose([Validators.required]);
        const row = this.fb.group({
            _id: data._id,
            customername: [data.customername],
            invnumber: [data.invnumber, req],
            nettotal: [data.nettotal, req],
            perbagvalue: [data.perbagvalue, req],
            tons: [data.tons, req],
            totbagvalue: [data.totbagvalue, req],
            prodname: [data.prodname, req],
            custid:[data.custid],
        });
        this.rowForms.push(row);
    }
    invoiceList = []
    InvoiceBranch=[]
    currentDate1
    InvoiceDate(value) {
        this.currentDate = value
        this.rowForms.controls = []
        this.InvoiceBranch=[]
       this.currentDate1 = moment(value).format('DD-MM-YYYY');
       var reqdata= "date=" + this.currentDate1 + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
        return this.makeapi.method(this.InvoiceEditAPI, reqdata , "post")
            .subscribe(data => {
                this.invoiceList = data.invoiceList
                // this.Pagination_Count1()
                var key = (Object.keys(data.branch))
                var value = (Object.values(data.branch))
                var array = []
                array.push(key[0], value[0])
                
                for (let i = 0; i < key.length; i++) {
                    for (let j = 0; j < value.length; j++) {
                        
                    }
                    var emtobj2 = { name: key[i], value: value[i] }
                        this.InvoiceBranch.push(emtobj2)
                }
                for (let i = 0; i < this.invoiceList.length; i++) {
                    this.addRow(this.invoiceList[i])
                }
            },
                Error => {
                });
    }
    Invoice() {
        var date = new Date()
        //  this.currentDate =  moment(date).format('DD-MM-YYYY');
        this.InvoiceDate(this.currentDate)
        $("#invoice_modal").modal("show")
    }
    InvoiceSave() {
        var data = []
        data = this.InvoiceForm.value.invoice
        return this.makeapi.method(this.updatetAPI, data, "postjson")
            .subscribe(data => {
                this.InvoiceDate(this.currentDate)
                $("#invoice_modal").modal("hide")
            },
                Error => {
                })

    }

    // Sales Part
    salesList = []
    salesCurrentDate: any
    paymentRecieved: any
    salelsDate(value) {
        var salesCurrentDate = moment(value).format('DD-MM-YYYY');
        return this.makeapi.method(this.overAllSalesAPI, "date=" + salesCurrentDate, "post")
            .subscribe(data => {
                this.salesList = []
                var salesList = data.brand
                var key = (Object.keys(salesList))
                var value = (Object.values(salesList))
                var array = []
                array.push({name:key[0], value:value[0]})
                for (let i = 0; i < key.length; i++) {
                    for (let j = 0; j < value.length; j++) {
                       
                    }
                    var emtobj2 = { name: key[i], value: value[i] }
                    this.salesList.push(emtobj2)
                }
                this.paymentRecieved = data.payment.received
            },
                Error => {
                })
    }

    // p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    this.paginationCount = []
    
    var reqdata = "date="  + this.currentDate1
    return this.makeapi.method(this.InvoicePaginationapi, reqdata, "post")
      .subscribe(data => {
        this.loading = false
        var totalcount = data['pagecount'];
        this.totalPartCount = totalcount; 
        this.InvoiceDate(this.currentDate)
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
  show_page=false
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
    // this.payment()
    this.InvoiceDate(this.currentDate)
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.show_page = true
    this.InvoiceDate(this.currentDate)
    // this.payment()
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
    // this.payment()
  }


//   totalPartCount1: any;
//   paginationCount1=[]
//   currentPageCount1 = 10
//   Pagination_Count1(){
//     this.paginationCount1 = []
    
//     var reqdata = "date="  + this.currentDate1
//     return this.makeapi.method(this.InvoicePaginationapi, reqdata, "post")
//       .subscribe(data => {
//         this.loading = false
//         var totalcount = data['pagecount1'];
//         this.totalPartCount1 = totalcount; 
//         this.InvoiceDate(this.currentDate)
//         this.totalPages1 = Math.ceil(this.totalPartCount1 / this.currentPageCount1);
//         var pagination = 0
//         for(let i=0; i<this.totalPages1; i++){
//           pagination++
//           this.paginationCount1.push(pagination)
//         }
//       },
//         Error => {
//         });
//   }
//   currentPage1 = 1;
//   totalPages1 = 10;
//   show_page1=false
//   paginatePartList1(page) {
//     // this.checkclicksingle = [];
//     this.show_page1 = true
//     if (page == 'prev' && this.currentPage1 > 1) {
//       if (page == 'prev') {
//         this.loading = true;
//       }
//       else {
//         this.loading = false;
//       }
//       this.currentPage1 = this.currentPage1 - 1;
//       this.pagecount1 = this.pagecount1 -1
      
//       // if(this.currentPage>=4){
//       //   var prevcount = this.currentPage
//       //   prevcount--
//       //   this.paginationCount.push(prevcount)
//       // }
//     }
//     else {
//       if (page == 'next') {
//         this.loading = true;
//       }
//       else {
//         this.loading = false;
//       }
//       this.currentPage1 = this.currentPage1 + 1
//       this.pagecount1 = this.pagecount1+1
//       // if(this.currentPage > 3){
//       //   var nextcount = this.currentPage-1
//       //   nextcount++
//       //   this.paginationCount.push(nextcount)
//       // }
//     }
//     // this.payment()
//     this.InvoiceDate(this.currentDate)
//   }
//   // page count added
//   paginationClick1(index){
//     this.currentPage1 = index+1
//     this.pagecount1 = index
//     this.show_page1 = true
//     this.InvoiceDate(this.currentDate)
//     // this.payment()
//   }
//   count_cal1(value){
//     this.Pagination_Count1()
//     if(value == 1){
//       this.currentPageCount1 = this.currentPageCount1+5
//     }else if(value == 2 && this.currentPageCount1 > 10){
//       this.currentPageCount1 = this.currentPageCount1-5
//     }
//     this.currentPage1 = 1
//     this.pagecount1 = 0
//     // this.payment()
//   }
}