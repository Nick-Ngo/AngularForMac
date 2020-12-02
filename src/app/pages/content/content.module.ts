import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';



@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, OrderComponent, OrderDetailComponent],
  imports: [
    CommonModule
  ]
})
export class ContentModule { }
