import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class PurhasedataService {

  constructor() { }
  // product_no_1:1;
  // product_rate=100; 
  // product_count=1;
  // product_tons=2.5;

  Decimal(){
    $(document).ready (function(){
      $('#txtDecimals').bind('keypress',function(e){
        var value = $('#txtDecimals').val();
      var characterCode = (e.which) ? e.which : e.keyCode;
      if (characterCode == 46 && value.indexOf('.') !=-1)
      return false;
      if (characterCode != 46 && characterCode > 31 && (characterCode < 48 || characterCode > 57))
      return false;
      return true;
    });
  });    
  } 
}

