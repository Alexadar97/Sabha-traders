import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { WebserviceService } from 'src/app/services/webservice.service';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
declare var $: any;
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css', 'new-customer-768px.css']
})
export class NewCustomerComponent implements OnInit {
  chkvalu: any;
  _id: string;
  get custype() {
    return this.Newcustomer.get('custtype');
  }
  get subdeal() {
    return this.Newcustomer.get('subdealer');
  }
  get csdn() {
    return this.Newcustomer.get('name');
  }
  get sdn() {
    return this.Newcustomer.get('name');
  }
  get wcn() {
    return this.Newcustomer.get('name');
  }
  get mblnum() {
    return this.Newcustomer.get('mobnumber');
  }
  get altmblnum1() {
    return this.Newcustomer.get('alternum1');
  }
  get altmblnum2() {
    return this.Newcustomer.get('alternum2');
  }
  get email() {
    return this.Newcustomer.get('emailid');
  }
  get gst() {
    return this.Newcustomer.get('gstin');
  }
  get addre() {
    return this.Newcustomer.get('address');
  }
  Newcustomer: FormGroup
  // API Call  
  private CustomerSaveapi = this.getdata.appconstant + 'customer/save';
  private Customerupdateapi = this.getdata.appconstant + 'customer/update';
  private CustomerListapi = this.getdata.appconstant + 'customer/list';
  private Customergetdateapi = this.getdata.appconstant + 'customer/get?';
  constructor(private fb: FormBuilder, private router: Router, private getdata: DatatransferService, private makeapi: WebserviceService, private route: ActivatedRoute, private _pur: PurhasedataService) {
    this.Newcustomer = this.fb.group({
      _id: null,
      custtype: [null, Validators.compose([Validators.required])],
      subdealer: [''],
      name: [null, Validators.compose([Validators.required])],
      mobnumber: [null, Validators.compose([Validators.required])],
      alternum1: [null, Validators.compose([Validators.required])],
      alternum2: [''],
      emailid: [null, Validators.compose([Validators.required, Validators.email])],
      gstin: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
    })
  }
  cus_id = null;
  loc_data: any
  ngOnInit() {
    this.cus_id = this.getdata.cus_id
    this.route.queryParams.filter(params => params.cus_id)
      .subscribe(params => {
        this.cus_id = params.cus_id;
        this.viewcus_det(this.cus_id)
      });
    this.loc_data = localStorage.getItem("customer")
  }
  // Click To Submit Data
  Submit_Customer() {
    var getform = this.Newcustomer.value
    getform.custtype = this.sub1
    getform.subdealer = this.customer_I
    if (getform.custtype == 'Sub Dealer') {
      getform.subdealer = ""
      this.Newcustomer.patchValue(getform)
    }
    if (getform.custtype == 'Walk in Customer') {
      getform.subdealer = ""
      this.Newcustomer.patchValue(getform)
    }
    if ((this.Newcustomer.invalid) || (getform.custtype == 'Customer of Sub Dealer' && getform.subdealer == '') ||
      (getform.name.trim() == '') || (getform.address.trim() == '')) {
      this.markFormGroupTouched(this.Newcustomer);
      this.getdata.notify('Form is Invalid');

    } else {
      if (getform._id == null) {
        getform._id = ""
      } if (getform.alternum2 == null) {
        getform.alternum2 = ""
      }
      var reqdata = "customerDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.CustomerSaveapi, reqdata, "post")
        .subscribe(data => {
          if (data.message == "Already exists") {
            this.getdata.notify('Already Customer is exists');
          }
          else if (data.message == "Customer created successfully") {
            this.getdata.notify('New Customer has been Added Successfully');
            this.router.navigateByUrl("/dashbord/customer");
          }
        },
          Error => {
          });
    }
  }
  // Click To Cancel Data
  Cancel() {
    this.router.navigate(['/dashbord/customer']);
    // this.Newcustomer.reset()   
  }
  modelbtn: any;
  sub1: any;
  sub2: any;
  sub3: any;
  // Dropdown Click Customer type
  checkbox(value) {
    this.sub1 = value
    if (this.sub1 == 'Sub Dealer') {
      this.search1 = "search1"
    }
    else {
      this.search1 = ""
    } if (this.sub1 == 'Customer of Sub Dealer') {
      this.search2 = "search2"
    } else {
      this.search2 = ""
    }
    if (this.sub1 == 'Walk in Customer') {
      this.search3 = "search3"
    } else {
      this.search3 = ""
    }
    $(document).ready(() => {
      $('[name=options]').val(value);
    });
    this.chkvalu = value
    var custype = this.Newcustomer.value
    custype.custtype = this.sub1
    this.Newcustomer.patchValue(custype);
    this.cus_name.splice(value, 1);
    this.empyt();
    console.log(value)
  }
  empyt() {
    var empty = this.Newcustomer.value
    empty.custtype = "";
    empty.custid = "";
    this.Newcustomer.patchValue(empty);
  }
  // Select Sudealer Data
  Customer_List = [];
  subdler = [];
  cus_o_sub = [];
  walk_i_cus = [];
  cus_name: any;
  case_error: any
  pending_list: any;
  modelbtn1: any;
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
    } this.customer_N = map[val]
    this.customer_I = val
    $("#customername").val(this.customer_N)
    $("#selectcustomer").hide()
    var getform = this.Newcustomer.value
    getform.custid = this.customer_N
    getform.subdealer = this.customer_N
    this.Newcustomer.patchValue(getform)
  }
  //  search subdealer name
  search_cusname(value) {
    if (value.length == 0) {
      var empty = this.Newcustomer.value
      this.cus_name.splice(value, 1);
      this.cus_name = []
      $("#selectcustomer").hide()
      this.Newcustomer.patchValue(empty);
      this.case_error = ""
    } else {
      this.Customer_List = [];
      var reqdata= "&searchstr=" + value + '&type=' + 'Sub Dealer' + "&page=" + 1 + "&pageLimit=" + 10
      return this.makeapi.method(this.CustomerListapi,reqdata, "post")
        .subscribe(data => {
          this.cus_name = data;
          if (data.length > 0) {
            $("#selectcustomer").slideDown()
            this.case_error = ""
          } else if (data.length == 0) {
            this.case_error = "case_error"
            this.cus_name.splice(value, 1);
            $("#selectcustomer").hide()
          }
        },
          Error => {
          });
    }
  }
  // Edit Get API
  customer_type: any
  search1: any
  search2: any
  search3: any
  viewcus_det(id) {
    var reqdata = "_id=" + id
    this.makeapi.method(this.Customergetdateapi + reqdata, "", "get")
      .subscribe(data => {
        this.modelbtn = "edit"
        console.log(data)
        if (data.custtype == 'Sub Dealer') {
          this.search1 = "search1"
        } else {
          this.search1 = ""
        }
        if (data.custtype == 'Customer of Sub Dealer') {
          this.search2 = "search2"
        } else {
          this.search2 = ""
        }
        if (data.custtype == 'Walk in Customer') {
          this.search3 = "search3"
        } else {
          this.search3 = ""
        }
        this.Newcustomer.patchValue(data)
        this.checkbox(data.custtype)
      },
        Error => {
        });
  }
  // Update Customer Data
  Update_Customer_info() {
    var getform = this.Newcustomer.value
    getform.custtype = this.sub1
    getform.subdealer = this.customer_I
    if (getform.custtype == 'Sub Dealer') {
      getform.subdealer = ""
      this.Newcustomer.patchValue(getform)
    }
    if (getform.custtype == 'Walk in Customer') {
      getform.subdealer = ""
      this.Newcustomer.patchValue(getform)
    }
    this.Newcustomer.patchValue(getform)
    if ((this.Newcustomer.invalid) || (getform.custtype == 'Customer of Sub Dealer' && getform.subdealer == '') ||
      (getform.name.trim() == '') || (getform.address.trim() == '')) {
      this.markFormGroupTouched(this.Newcustomer);
      this.getdata.notify('Form is Invalid');
    } else {
      var reqdata = "customerDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.Customerupdateapi, reqdata, "post")
        .subscribe(data => {
          this.getdata.notify('Product has been Updated Successfully');
          this.router.navigateByUrl("/dashbord/customer");
          this.Newcustomer.reset()
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
}
