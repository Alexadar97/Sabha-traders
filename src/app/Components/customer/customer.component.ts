import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', 'customerlist-768px.css', 'customerlist-1024px.css']
})
export class CustomerComponent implements OnInit {
  private CustomerListapi = this.getdata.appconstant + 'customer/list';
  private CustomerPaginationapi = this.getdata.appconstant + 'customer/getPaginationCount'
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.Customer();
    this.loading = true;
    this.Pagination_Count();
  }
  //Customer List API
  Customer_List = [];
  loading=false
  pagecount = 0
  Customer() {
    var reqdata ="searchstr=" + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.CustomerListapi,reqdata, "post")
      .subscribe(data => {
        this.Customer_List = data
      },
        Error => {
        });
  }
  // Search Customer Data
  search_event(value) {
    var reqdata = "searchstr=" + value + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.CustomerListapi, reqdata, "post")
      .subscribe(data => {
        this.Customer_List = data
        console.log(data)
      },
        Error => {
        });
  }
  // Click Edit
  editbtn(id) {
    this.getdata.customerinfovalue(id)
    localStorage.setItem("customer", "edit")
  }
  // Show Customer_INFO
  Cus_info(id) {
    this.getdata.customerinfodata(id)
  }
  // Click Add New Customer 
  onclick() {
    this.router.navigate(['/dashbord/newcustomer']);
    localStorage.setItem("customer", "add")
  }
  // Customer Type Color
  pickColor(val) {
    return this.getdata.StatusColor(val)
  }
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    var reqdata = "searchstr=" 
    return this.makeapi.method(this.CustomerPaginationapi, reqdata, "post")
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
    this.Customer()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.Customer()
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
    this.Customer()
  }
}
