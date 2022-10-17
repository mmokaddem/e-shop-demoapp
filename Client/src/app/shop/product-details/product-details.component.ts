import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  today = new Date();
  deliveryFrom = new DatePipe('en-US').transform(
    this.today.setDate(this.today.getDate() + 7),
    'dd/MM/yyyy'
  );
  deliveryUntil = new DatePipe('en-US').transform(
    this.today.setDate(this.today.getDate() + 14),
    'dd/MM/yyyy'
  );

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (product: IProduct) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
}
