import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
declare var $: any;

@Injectable()
export class DatatransferService { 
  appcode: any;
  userid: any;
  logintype: any;
  user_email: any;
  charttype:any
  layouttype:any
  // QA-Server
  appconstant = 'http://139.59.75.83:9999/SabhaIMSTool/';
  prod_id_det: any;

  constructor(private Router:Router) {
  }
  showhomePageMenu = 'show'

  notify(msg){    
    $("#notifyMsg").html(msg)
    $("#notifyMsg").fadeIn('fast');
    $('#notifyMsg').delay(1500).fadeOut('slow');
  }

  // showNotification(from, align, msg, type) {

  //   $.notify({
  //     icon: 'notifications',
  //     message: msg

  //   }, {
  //     type: type,
  //     timer: 2000,
  //     placement: {
  //       from: from,
  //       align: align
  //     }
  //   });
  // }
  // public session: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  getsession(value) {
    // this.session.next(value);
  }
  
 
  // appcode = 'vignesshgmailcom'
  // userid = 'users1';
  // logintype = 'superuser';
  //  getapi(value) {
  //      this.apidetail.next(value);
  //  }
  partid: any;
  setpartid(partid) {
    this.partid = partid;
    console.log(this.partid)
  }
  pmpProjectid = null;
  pmpProjectname = null;
  pmppartid = null;
  pmpStatusProjectid = null;
  pmpStatusProjectName=null;
  devstatusmailteam = [];
  devstatuspartid = [];

  cus_id:any  
  customerinfovalue(cus_id){
    this.cus_id = cus_id;
    this.Router.navigate(['/dashbord/newcustomer'],{queryParams : { cus_id : this.cus_id}})
    // this.cus_value = "completed"
  }
  cus_info_id:any  
  customerinfodata(cus_info_id){
    this.cus_info_id = cus_info_id;
    this.Router.navigate(['/dashbord/customerinfo'],{queryParams : { cus_info_id : this.cus_info_id}})
    // this.cus_value = "completed"
  }

  StatusColor(key){

    var colorsMap = {
        "Sub Dealer":'#03B8C0',
        "Customer of Sub Dealer":'#037AC0',
        "Walk in Customer":'#E3718A',
    }
    var colorsVal = "";
    if(colorsMap.hasOwnProperty(key)){
        colorsVal = colorsMap[key];
    }else{
        colorsVal = key;
    }

    return colorsVal;
  }
}
