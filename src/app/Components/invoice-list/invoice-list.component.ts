import { Component, OnInit, ElementRef } from '@angular/core';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
declare var $;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css', 'invoice-list-768px.css', 'invoice-list-1024px.css']
})
export class InvoiceListComponent implements OnInit {
  private InvoiceListapi = this.getdata.appconstant + 'invoice/list';
  private InvoiceFilitergetapi = this.getdata.appconstant + 'invoice/getFilterColumnValues';
  private filterListAPI = this.getdata.appconstant + 'invoice/filterList';
  private InvoicePaginationapi = this.getdata.appconstant + 'invoice/getPaginationCount'
  private Invoice_Fil_Paginationapi = this.getdata.appconstant + 'invoice/getFillterPaginationCount'
  Invoice_Filiter: FormGroup
  constructor(private fb: FormBuilder, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef) {
    this.Invoice_Filiter = this.fb.group({
      date: [null],
      productNames: [null],
      branchNames: [null],
      cutomerTypes: [null]
    })

  }
  usertype: any
  userid: any
  loading=false
  pagecount = 0
  click_fil=false
  ngOnInit() {
    this.usertype = localStorage.getItem("usertype")
    this.userid = localStorage.getItem("userid")
    this.Invoice();
    this.filiterget();
    this.loading = true;
    this.Pagination_Count(); 
    this.click_fil=false   
  }
  selectedAll: any;
  Invoice_List = [];
  // Invoice List API
  Invoice() {
    console.log(this.userid)
    console.log(this.usertype)
    var reqdata = "usertype=" + this.usertype + "&userid=" + this.userid + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.InvoiceListapi, reqdata, "post")
      .subscribe(data => {
        this.Invoice_List = data
      },
        Error => {
        });
  }
  // Search Data
  invoice_ser=""
  search_event(value) {
    this.invoice_ser= value
    if(this.click_fil){
    this.Apply_filter()
    // this.Filter_Pagination_Count()
     
  }else{
    var reqdata = "searchstr=" + this.invoice_ser + "&usertype=" + this.usertype + "&userid=" + this.userid + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.InvoiceListapi, reqdata, "post")
      .subscribe(data => {
        this.Invoice_List = data
       
      },
        Error => {
        });
      }
  }
  //  Customer Type Color 
  pickColor(val) {
    return this.getdata.StatusColor(val)
  }

  filiter: any
  // Click to Filter
  onFilter() {
    this.filiter = "filiter"
    this.click_fil=true
  }
  icon = false
  // Clear Filter Click
  clear_filiter() {
    localStorage.removeItem("filter_store")  
    this.filiter = ""
    this.icon = false
    this.Invoice_Filiter.reset()
    var empty = this.Invoice_Filiter.value
    empty.date = ""
    empty.productNames = []
    empty.branchNames = []
    empty.cutomerTypes = []
    this.Invoice_Filiter.patchValue(empty)
    this.Invoice()
    this.click_fil=false
  }

  Product_Filiter_list = [];
  Branch_Filiter_list = [];
  Customer_Filiter_list = [];
  // Filter Get API
  filiterget() {
    return this.makeapi.method(this.InvoiceFilitergetapi, "", "get")
      .subscribe(data => {
        this.Product_Filiter_list = data.productNames
        this.Branch_Filiter_list = data.branchNames
        this.Customer_Filiter_list = data.cutomerTypes
        console.log(data)
      },
        Error => {
        });
  }
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

  // Branch multiple select box
  ShowFilter1: any
  selectedItems1 = [];
  dropdownSettings1 = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: this.ShowFilter1
  };
  onItemSelect1(item: any) {

  }
  onSelectAll1(items: any) {

  }
  toogleShowFilter1() {

    this.ShowFilter1 = !this.ShowFilter1;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter1 });
  }

  handleLimitSelection1() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  // CusomerType multiple select box
  ShowFilter2: any
  selectedItems2 = [];
  dropdownSettings2 = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: this.ShowFilter1
  };
  onItemSelect2(item: any) {

  }
  onSelectAll2(items: any) {

  }
  toogleShowFilter2() {

    this.ShowFilter1 = !this.ShowFilter1;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter1 });
  }

  handleLimitSelection2() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  // Apply Filter Click
  Apply_filter() {
    // if(this.click_fil){

    // }
    var getform = this.Invoice_Filiter.value
    var date = $("#Date").val()
    getform.date = date
    // getform.date = moment(date).format('DD-MM-YYYY');
    if (getform.date == "undefined") {
      getform.date = ""
    } if (getform.productNames == null) {
      getform.productNames = []
    } if (getform.branchNames == null) {
      getform.branchNames = []
    }
    if (getform.cutomerTypes == null) {
      getform.cutomerTypes = []
    }
     if(this.invoice_ser != ""){
      var getdata = localStorage.getItem("filter_store")  
      getform = JSON.parse(getdata)
      console.log(getform)
     }
    var rdata = { "usertype": this.usertype, "userid": this.userid, "date": getform.date, "productNames": getform.productNames, "branchNames": getform.branchNames, "cutomerTypes": getform.cutomerTypes, "searchstr": this.invoice_ser, "page" : this.currentPage , "pageLimit" : String(this.currentPageCount)}
    var reqdata = "filterby=" + JSON.stringify(rdata)
    return this.makeapi.method(this.filterListAPI, reqdata, "post")
      .subscribe(data => {
        localStorage.setItem("filter_store", JSON.stringify(getform))
        this.Invoice_List = data
        this.filiter = ""
        this.icon = true
        this.Filter_Pagination_Count()
      debugger
      },
        Error => {

        })
  }
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    var reqdata = "searchstr=" + "&usertype=" + this.usertype + "&userid=" + this.userid
    return this.makeapi.method(this.InvoicePaginationapi, reqdata, "post")
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
    this.Invoice()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.Invoice()
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
    this.Invoice()
  }
  Filter_Pagination_Count(){
    var getform = this.Invoice_Filiter.value
    // var reqdata = "usertype"+ this.usertype + "&userid=" + this.userid + "&date= " + getform.date + "&productNames=" + getform.productNames + "&branchNames=" + getform.branchNames + "&cutomerTypes=" + getform.cutomerTypes + "&searchstr=" + ""
    var data = { "usertype": this.usertype, "userid": this.userid, "date": getform.date, "productNames": getform.productNames, "branchNames": getform.branchNames, "cutomerTypes": getform.cutomerTypes, "searchstr": this.invoice_ser}
    var reqdata = "filterby=" + JSON.stringify(data)
    return this.makeapi.method(this.Invoice_Fil_Paginationapi, reqdata, "post")
      .subscribe(data => {
        this.loading = false
        var totalcount = data['pagecount'];
        this.totalPartCount = totalcount; 

        this.totalPages = Math.ceil(this.totalPartCount / this.currentPageCount);
        var pagination = 0
        this.Invoice_Filiter.reset()
        for(let i=0; i<this.totalPages; i++){
          pagination++
          this.paginationCount.push(pagination)          
        }
      },
        Error => {
        });
  }

}
