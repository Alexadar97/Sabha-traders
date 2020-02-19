import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', 'product-list-768px.css']
})
export class ProductListComponent implements OnInit {
  get bname() {
    return this.Newproduct.get('prodname');
  }

  get hsnc() {
    return this.Newproduct.get('hsncode');
  }

  get purrate() {
    return this.Newproduct.get('purchaserate');
  }

  get salesrate() {
    return this.Newproduct.get('salerate');
  }

  Newproduct: FormGroup
  private ProductSaveapi = this.getdata.appconstant + 'product/save';
  private ProductListapi = this.getdata.appconstant + 'product/list';
  private Productgetdateapi = this.getdata.appconstant + 'product/get?';
  private Productupdateapi = this.getdata.appconstant + 'product/update';
  private ProductPaginationapi = this.getdata.appconstant + 'product/getPaginationCount';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService,
    private route: ActivatedRoute, private _pur: PurhasedataService) {

    this.Newproduct = this.fb.group({
      _id: null,
      prodname: ['', Validators.required],
      hsncode: ['', Validators.required],
      purchaserate: ['', Validators.required],
      salerate: ['', Validators.required],
    })
  }
  prod_id_det: any;
  prod_id: any;
  loading=false
  pagecount = 0
  ngOnInit() {
    this.Product();
    this._pur.Decimal();
    this.loading = true;
    this.Pagination_Count();
  }
  // Click Submit 
  modelbtn: any;
  Submit_Product() {
    var getform = this.Newproduct.value
    if ((this.Newproduct.invalid) || (getform.prodname.trim() == '') || (getform.hsncode.trim() == '') || (getform.purchaserate == 0) || (getform.salerate == 0)) {
      this.markFormGroupTouched(this.Newproduct);
      this.getdata.notify('Form is Invalid');

    } else {

      var getform = this.Newproduct.value
      var reqdata = "productDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.ProductSaveapi, reqdata, "post")
        .subscribe(data => {
          $("#myModal").modal("hide")
          this.Newproduct.reset()
          this.getdata.notify('New Product has been Added Successfully');
          this.Product()
        },
          Error => {
          });
    }
  }
  // Cancel Click 
  cancel() {
    this.Newproduct.reset()
    $("#myModal").modal("hide")
  }
  // List Data API
  Product_List = []
  Product() {
    var reqdata ="searchstr=" + "&page=" + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.ProductListapi, reqdata, "post")
      .subscribe(data => {
        this.Product_List = data
      },
        Error => {
        });
  }
  // Edit Get Data API
  viewprod_det(id) {
    var reqdata = "id=" + id
    this.makeapi.method(this.Productgetdateapi + reqdata, "", "get")
      .subscribe(data => {
        console.log(data)
        this.Newproduct.patchValue(data)
      },
        Error => {
        });
  }
  // Click Edit 
  product: any
  edit(id) {
    this.modelbtn = "edit"
    this.viewprod_det(id)
    $("#myModal").modal("show")
  }
  // Click To Update Data
  Update_Product() {
    var getform = this.Newproduct.value
    if ((this.Newproduct.invalid) || (getform.prodname.trim() == '') || (getform.hsncode.trim() == '')) {
      this.markFormGroupTouched(this.Newproduct);
      this.getdata.notify('Form is Invalid');
    } else {
      var reqdata = "productDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.Productupdateapi, reqdata, "post")
        .subscribe(data => {
          this.Newproduct.reset()
          this.getdata.notify('Product has been Updated Successfully');
          $("#myModal").modal("hide")
          this.Product()
        },
          Error => {
          });
    }
  }
  // Search Data API
  search_event(value) {
    var reqdata = "searchstr=" + value + "&page="  + this.currentPage + "&pageLimit=" + this.currentPageCount
    return this.makeapi.method(this.ProductListapi, reqdata, "post")
      .subscribe(data => {
        this.Product_List = data
        console.log(data)
      },
        Error => {
        });
  }
  // Click Add New Product 
  onclick() {
    this.modelbtn = "add"
    this.Newproduct.reset()
    $("#myModal").modal("show")
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
  p1=1
  totalPartCount: any;
  paginationCount=[]
  currentPageCount = 10
  Pagination_Count(){
    var reqdata = "searchstr=" 
    return this.makeapi.method(this.ProductPaginationapi, reqdata, "post")
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
    this.Product()
  }
  
  // page count added
  paginationClick(index){
    this.currentPage = index+1
    this.pagecount = index
    this.Product()
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
    this.Product()
  }
}
