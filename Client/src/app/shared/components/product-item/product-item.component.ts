import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { SidebarCartService } from 'src/app/core/sidebar-cart/sidebar-cart.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;

  constructor(
    private basketService: BasketService,
    private sidebarCart: SidebarCartService
  ) {}

  ngOnInit(): void {}

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
    this.sidebarCart.openSidebarCart();
  }
}
