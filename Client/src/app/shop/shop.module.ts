import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShopComponent, ProductDetailsComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule, FormsModule],
  providers: [CurrencyPipe],
})
export class ShopModule {}
