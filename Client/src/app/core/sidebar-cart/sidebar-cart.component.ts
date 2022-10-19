import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import {
  IBasket,
  IBasketItem,
  IBasketTotals,
} from 'src/app/shared/models/basket';
import { SidebarCartService } from './sidebar-cart.service';

@Component({
  selector: 'app-sidebar-cart',
  templateUrl: './sidebar-cart.component.html',
  styleUrls: ['./sidebar-cart.component.scss'],
})
export class SidebarCartComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(
    private basketService: BasketService,
    private sidebarCartService: SidebarCartService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotals$;
    this.listenToDocumentClick();
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  closeSidebarCart() {
    this.sidebarCartService.closeSidebarCart();
  }

  private listenToDocumentClick() {
    document.addEventListener(
      'click',
      (event) => this.onDocumentClickEvent(event),
      { capture: true }
    );
  }

  private onDocumentClickEvent(event: any) {
    const sidebarCart = document.querySelector('#sidebarCart');

    if (!sidebarCart.classList.contains('visible')) return;

    if (event.target.closest('#sidebarCart') == null) {
      this.sidebarCartService.closeSidebarCart();
    }
  }
}
