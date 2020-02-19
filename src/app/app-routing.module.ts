import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { BranchasListComponent } from './Components/branchas-list/branchas-list.component';
import { NewBranchasComponent } from './Components/new-branchas/new-branchas.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "login" },
  { path: 'login', component: LoginPageComponent },

  {
    path: 'dashbord', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard-data', pathMatch: 'full' },
      { path: 'dashboard-data', component: DashboardDataComponent },
      { path: 'purchaselist', component: PurchaseListComponent },
      { path: 'newpurchase', component: NewPurchaseComponent },
      { path: 'invoicelist', component: InvoiceListComponent },
      { path: 'newinvoice', component: NewInvoiceComponent },
      { path: 'paymentlist', component: PaymentDetailsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'newcustomer', component: NewCustomerComponent },
      { path: 'customerinfo', component: CustomerInfoComponent },
      { path: 'download', component: DownloadComponent },
      { path: 'productlist', component: ProductListComponent },
      { path: 'branchaslist', component: BranchasListComponent },
      { path: 'newbranchas', component: NewBranchasComponent },
      { path: 'userlist', component: UsersListComponent },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [DashboardComponent,
  DashboardDataComponent,
  PurchaseListComponent,
  NewPurchaseComponent,
  InvoiceListComponent,
  NewInvoiceComponent,
  PaymentComponent,
  CustomerComponent,
  NewCustomerComponent,
  CustomerInfoComponent,
  PaymentDetailsComponent,
]


