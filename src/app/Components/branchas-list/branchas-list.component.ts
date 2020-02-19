import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurhasedataService } from 'src/app/services/purhasedata.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebserviceService } from 'src/app/services/webservice.service';
declare var $: any;
@Component({
  selector: 'app-branchas-list',
  templateUrl: './branchas-list.component.html',
  styleUrls: ['./branchas-list.component.css']
})
export class BranchasListComponent implements OnInit {
  modelbtn:any; 
  Branch_List=[];
  get bname(){
    return this.Newbranch.get('branchname');
  }
  Newbranch:FormGroup
  private BranchSaveapi = this.getdata.appconstant + 'branch/save';
  private BranchListapi = this.getdata.appconstant + 'branch/list';
  private BranchGetapi = this.getdata.appconstant + 'branch/get?';
  private BrachUpdateapi = this.getdata.appconstant + 'branch/update';
  constructor(private fb: FormBuilder,private router: Router, private getdata: DatatransferService, private makeapi:WebserviceService,
    private route: ActivatedRoute,private _pur: PurhasedataService) {
      this.Newbranch = this.fb.group({
        _id:null,
        branchname: [null, Validators.compose([Validators.required])],        
      })
     }

  ngOnInit() {
    this.Branch()
    this.Newbranch.reset()
  }
  // Add New_Branch Click 
  onclick(){
    this.modelbtn="add"
    this.Newbranch.reset();
     $("#myModal").modal("show")
   }
  // Cancel New_User Click 
   cancel(){
    this.Newbranch.reset()
    $("#myModal").modal("hide")
   }
  //  submit button
  submit_branch(){
    var getform = this.Newbranch.value 
    if ( (this.Newbranch.invalid) || (getform.branchname.trim()  =='')) {     
      this.markFormGroupTouched(this.Newbranch);
      this.getdata.notify('Form is Invalid');  
    }else {
      var geform = this.Newbranch.value 
    var det=geform.branchname
    var encode=encodeURIComponent(det); 
    var getform = this.Newbranch.value 
    getform.branchname=encode 
    this.Newbranch.patchValue(getform)
      var reqdata = "branchDetails=" + JSON.stringify(getform)
      return this.makeapi.method(this.BranchSaveapi, reqdata, "post")      
        .subscribe(data => { 
          if(data.message =="Branch already exists"){
            this.getdata.notify(data.message);
          }else if(data.message =="Branch created successfully"){
          this.getdata.notify('New Branch has been Added Successfully');
          $("#myModal").modal("hide")  
          this.Newbranch.reset();
          this.Branch()
        }
        },
          Error => {
          });  
        }
  }
  // Branch List API
  Branch(){         
    return this.makeapi.method(this.BranchListapi,"", "post")
    .subscribe(data => {        
         this.Branch_List=data     
    },
      Error => {       
      });
  }
   // Edit Get Data
   viewbranch_det(id){
    var reqdata = "_id=" +id
    this.makeapi.method(this.BranchGetapi+reqdata, "", "get")
    .subscribe(data => {
      console.log(data)     
      this.Newbranch.patchValue(data)
    },
      Error => {
      });
  }  
  // Click Edit 
  edit_user(id){
  this.modelbtn="edit"
  this.viewbranch_det(id)
  $("#myModal").modal("show")
  } 
  // Click To Update Data
  Update_branch() {
    var geform = this.Newbranch.value 
    var det=geform.branchname
    var encode=encodeURIComponent(det); 
    var getform = this.Newbranch.value 
    getform.branchname=encode 
    this.Newbranch.patchValue(getform)
    if((this.Newbranch.invalid) || (getform.branchname.trim()  =='')){ 
     
      this.markFormGroupTouched(this.Newbranch);     
      this.getdata.notify('Form is Invalid');
      } else { 
    var getform = this.Newbranch.value
    var reqdata ="branchDetails="+ JSON.stringify(getform)
    return this.makeapi.method(this.BrachUpdateapi,reqdata, "post")
    .subscribe(data => {   
      this.Newbranch.reset();
      this.getdata.notify('Branch has been Updated Successfully');  
      $("#myModal").modal("hide")  
      this.Branch() 
    },
    Error => {      
    }); 
  }  
  }
  // Form Validation
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
