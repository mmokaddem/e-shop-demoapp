import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { Basket } from './shared/models/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-shop';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => {
          console.log('basket initialised');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.basketService.resetBasket();
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe({
      next: () => {
        console.log('User loaded');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
