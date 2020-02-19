import { Component, OnInit, ElementRef } from '@angular/core';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;
declare var moment, require;
var moment = require('moment');
@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css', 'purchase-list-768px.css', 'purchase-list-1024px.css']
})
export class PurchaseListComponent implements OnInit {
  private PurchaseListapi = this.getdata.appconstant + 'purchase/list';
  private PurchaseFilitergetapi = this.getdata.appconstant + 'purchase/getFilterColumnValues';
  private filterListAPI = this.getdata.appconstant + 'purchase/filterList';
  private PurchasePaginationapi = this.getdata.appconstant + 'purchase/getPaginationCount'
  private Purchase_Fil_Paginationapi = this.getdata.appconstant + 'purchase/getFillterPaginationCount'
  Purchase_Filiter: FormGroup
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private _el: ElementRef) {
    this.Purchase_Filiter = this.fb.group({
      date: [null],
      productNames: [null],
      branchNames: [null],
    })

  }
  ngOnInit() {
    this.Purchase();
    this.filiterget();
    this.loading = true;
    this.Pagination_Count();
    this.click_fil=false   
  }
  // List Data API
  selectedAll: any;
  Purchase_List = [];
  loading=false
  pagecount = 0
  click_fil=false
  Purchase() {
    var reqdata ="searchstr=" + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.PurchaseListapi, reqdata, "post")
      .subscribe(data => {
        this.Purchase_List = data
      },
        Error => {
        });
  }
  // Search Data API
  purchase_ser=""
  search_event(value) {
    this.purchase_ser= value
    if(this.click_fil){
      this.Apply_filter()
      // this.Filter_Pagination_Count()
       
    }else{
    var reqdata = "searchstr=" + this.purchase_ser + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.PurchaseListapi, reqdata, "post")
      .subscribe(data => {
        this.Purchase_List = data
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
  // Click Cancel Data
  icon = false
  clear_filiter() {
    localStorage.removeItem("filter_store")  
    this.filiter = ""
    this.icon = false
    this.Purchase_Filiter.reset()
    var empty = this.Purchase_Filiter.value
    empty.date = ""
    empty.productNames = []
    empty.branchNames = []
    this.Purchase_Filiter.patchValue(empty)
    this.Purchase()
    this.click_fil=false
  }
  // Filter Get API
  Product_Filiter_list = [];
  Branch_Filiter_list = [];
  filiterget() {
    return this.makeapi.method(this.PurchaseFilitergetapi, "", "get")
      .subscribe(data => {
        this.Product_Filiter_list = data.productNames
        this.Branch_Filiter_list = data.branchNames
        console.log(data)
      },
        Error => {
        });
  }
  // Add new Purchase Click
  onclick() {
    this.router.navigate(['/dashbord/newpurchase']);
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
  // Applay Filter Click
  Apply_filter() {
    var getform = this.Purchase_Filiter.value
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
    if(this.purchase_ser != ""){
      var getdata = localStorage.getItem("filter_store")  
      getform = JSON.parse(getdata)
      console.log(getform)
     }
    var rdata = { "date": getform.date, "productNames": getform.productNames, "branchNames": getform.branchNames, "searchstr": this.purchase_ser, "page" : this.currentPage , "pageLimit" : String(this.currentPageCount)}
    var reqdata = "filterby=" + JSON.stringify(rdata)
    return this.makeapi.method(this.filterListAPI, reqdata, "post")
      .subscribe(data => {
        localStorage.setItem("filter_store", JSON.stringify(getform))
        this.Purchase_List = data
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
    var reqdata = "searchstr=" 
    return this.makeapi.method(this.PurchasePaginationapi, reqdata, "post")
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
    this.Purchase()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.Purchase()
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
    this.Purchase()
  }
  Filter_Pagination_Count(){
    var getform = this.Purchase_Filiter.value
    var data = { "date": getform.date, "productNames": getform.productNames, "branchNames": getform.branchNames, "searchstr":String(this.purchase_ser)}
    var reqdata = "filterby=" + JSON.stringify(data)
    return this.makeapi.method(this.Purchase_Fil_Paginationapi, reqdata, "post")
      .subscribe(data => {
        this.loading = false
        var totalcount = data['pagecount'];
        this.totalPartCount = totalcount; 

        this.totalPages = Math.ceil(this.totalPartCount / this.currentPageCount);
        var pagination = 0
        this.Purchase_Filiter.reset()
        for(let i=0; i<this.totalPages; i++){
          pagination++
          this.paginationCount.push(pagination)          
        }
      },
        Error => {
        });
  }

}

