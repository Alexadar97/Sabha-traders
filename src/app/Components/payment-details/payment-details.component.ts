import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
declare var $;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css', 'payment-details-768px.css']
})
export class PaymentDetailsComponent implements OnInit {
  private PaymentListapi = this.getdata.appconstant + 'payment/list';
  private PaymentFilitergetapi = this.getdata.appconstant + 'payment/getFilterColumnValues';
  private filterListAPI = this.getdata.appconstant + 'payment/filterList';
  private PaymentPaginationapi = this.getdata.appconstant + 'payment/getPaginationCount';
  private Payment_Fil_Paginationapi = this.getdata.appconstant + 'payment/getFillterPaginationCount'
  // router: any;
  Payment_Filiter: FormGroup
  constructor(private fb: FormBuilder, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef) {
    this.Payment_Filiter = this.fb.group({
      date: [null],
      bankNames: [null],
    })
  }
  usertype: any
  userid: any
  loading=false
  pagecount = 0
  show_page=false
  click_fil=false
  ngOnInit() {
    this.usertype = localStorage.getItem("usertype")
    this.userid = localStorage.getItem("userid")
    this.payment();
    this.filiterget();
    this.loading = true;
    this.Pagination_Count();
    this.click_fil=false   
  }
  // List Data API
  selectedAll: any;
  Payment_List = [];
  payment() {
    var reqdata = "usertype=" + this.usertype + "&userid=" + this.userid + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.PaymentListapi, reqdata, "post")
      .subscribe(data => {
        this.Payment_List = data
        
      },
        Error => {
        });
  }
  // Search Data
  payment_ser=""
  search_event(value) {
    this.payment_ser= value
    if(this.click_fil){
      this.Apply_filter()
      // this.Filter_Pagination_Count()
       
    }else{
    var reqdata = "searchstr=" + this.payment_ser + "&usertype=" + this.usertype + "&userid=" + this.userid + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.PaymentListapi, reqdata, "post")
      .subscribe(data => {
        this.Payment_List = data
      },
        Error => {
        });
      }
  }
  //Click Filiter Data 
  filiter: any
  onFilter() {
    this.filiter = "filiter"
    this.click_fil=true
  }
  icon = false
  // Clear Filter
  clear_filiter() {
    localStorage.removeItem("filter_store")  
    this.filiter = ""
    this.filiter = ""
    this.icon = false
    this.Payment_Filiter.reset()
    var empty = this.Payment_Filiter.value
    empty.date = ""
    empty.bankNames = []
    this.Payment_Filiter.patchValue(empty)
    this.payment()
    this.click_fil=false
  
  }
  // Filter Get API
  Bank_Filiter_list = [];
  filiterget() {
    return this.makeapi.method(this.PaymentFilitergetapi, "", "get")
      .subscribe(data => {
        this.Bank_Filiter_list = data.bankNames
        console.log(data)
      },
        Error => {
        });
  }
  // product multiple select box
  ShowFilter: any
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: this.ShowFilter
  };
  multiplearray = []
  multipleallarray = []
  select: any
  limitSelection = false
  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  toogleShowFilter() {

    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  // Apply Filter Click
  date=""
  Apply_filter() {
    var getform = this.Payment_Filiter.value
    this.date = $("#Date").val()
    // getform.date = moment(date).format('DD-MM-YYYY');
    getform.date= this.date
    if (getform.date == "undefined") {
      getform.date = ""
    } if (getform.bankNames == null) {
      getform.bankNames = []
    }
    if(this.payment_ser != ""){
      var getdata = localStorage.getItem("filter_store")  
      getform = JSON.parse(getdata)
      console.log(getform)
     }
    var rdata = { "usertype": this.usertype, "userid": this.userid, "date": getform.date, "bankNames": getform.bankNames, "searchstr": this.payment_ser, "page" : this.currentPage , "pageLimit" : String(this.currentPageCount)}
    var reqdata = "filterby=" + JSON.stringify(rdata)
    return this.makeapi.method(this.filterListAPI, reqdata, "post")
      .subscribe(data => {
        localStorage.setItem("filter_store", JSON.stringify(getform))
        this.Payment_List = data
        this.filiter = ""
        this.icon = true
        this.Filter_Pagination_Count()
      },
        Error => {

        })
  }
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    this.paginationCount = []
    var reqdata = "searchstr=" + "&usertype=" + this.usertype + "&userid=" + this.userid
    return this.makeapi.method(this.PaymentPaginationapi, reqdata, "post")
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
    this.payment()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.show_page = true
    this.payment()
    
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
    this.payment()
  }
  Filter_Pagination_Count(){
    var getform = this.Payment_Filiter.value
    var data = { "usertype": this.usertype, "userid": this.userid, "date": getform.date, "bankNames": getform.bankNames,"searchstr": this.payment_ser }
    var reqdata = "filterby=" + JSON.stringify(data)
    return this.makeapi.method(this.Payment_Fil_Paginationapi, reqdata, "post")
      .subscribe(data => {
        this.loading = false
        var totalcount = data['pagecount'];
        this.totalPartCount = totalcount; 

        this.totalPages = Math.ceil(this.totalPartCount / this.currentPageCount);
        var pagination = 0
        this.Payment_Filiter.reset()
        for(let i=0; i<this.totalPages; i++){
          pagination++
          this.paginationCount.push(pagination)          
        }
      },
        Error => {
        });
  }
}
