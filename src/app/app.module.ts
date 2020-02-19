import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PurchaseListComponent } from './Components/purchase-list/purchase-list.component';
import { NewPurchaseComponent } from './Components/new-purchase/new-purchase.component';
import { InvoiceListComponent } from './Components/invoice-list/invoice-list.component';
import { NewInvoiceComponent } from './Components/new-invoice/new-invoice.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { NewCustomerComponent } from './Components/new-customer/new-customer.component';
import { CustomerInfoComponent } from './Components/customer-info/customer-info.component';
import { DownloadComponent } from './Components/Download-com/download/download.component';
import { ProductListComponent } from './Components/products/product-list/product-list.component';
import { PaymentDetailsComponent } from './Components/payment-details/payment-details.component';
import { DashboardDataComponent } from './Components/dashboard-data/dashboard-data.component';
import { NewBranchasComponent } from './Components/new-branchas/new-branchas.component';
// import { NgxSpinnerModule } from "ngx-spinner";
import { HighchartsChartModule } from 'highcharts-angular';
import { WebserviceService } from './services/webservice.service';
import { DatatransferService } from './services/datatransfer.service';
import { HttpModule } from '@angular/http';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgxCurrencyModule } from "ngx-currency";
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { BranchasListComponent } from './Components/branchas-list/branchas-list.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

export const customCurrencyMaskConfig = {
  align: "unset",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 2,
  prefix: "₹",
  suffix: "",
  thousands: ",",
  nullable: true
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PurchaseListComponent,
    NewPurchaseComponent,
    InvoiceListComponent,
    NewInvoiceComponent,
    PaymentComponent,
    CustomerComponent,
    NewCustomerComponent,
    CustomerInfoComponent,
    DownloadComponent,
    ProductListComponent,   
    PaymentDetailsComponent, 
    DashboardDataComponent, 
    BranchasListComponent,   
    UsersListComponent, 
    LoginPageComponent, 
    NewBranchasComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,     
    ReactiveFormsModule,
    HighchartsChartModule,
    HttpModule, 
    DropDownListModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NotifierModule,    
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,   
    NgMultiSelectDropDownModule, 
    // NgxSpinnerModule,
    // IgxDatePickerModule
  ],
  providers: [WebserviceService, DatatransferService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
