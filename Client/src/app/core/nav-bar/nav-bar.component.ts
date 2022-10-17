import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.onDocumentClickedListener();
  }

  toggleUserDropdownMenu() {
    const menu = document.querySelector('#user-dropdown .dropdown-menu');
    menu.classList.toggle('visible');
  }

  logout() {
    this.accountService.logout();
  }

  onDocumentClickedListener() {
    document.addEventListener('click', (event: any) => {
      // close dropdown menu
      if (event.target.closest('#user-dropdown .dropdown-toggle') === null) {
        const menu = document.querySelector('#user-dropdown .dropdown-menu');
        if (menu) {
          if (
            menu.classList.contains('visible') &&
            event.target.closest('#userMenu') === null
          ) {
            menu.classList.remove('visible');
          }
        }
      }
    });
  }
}
