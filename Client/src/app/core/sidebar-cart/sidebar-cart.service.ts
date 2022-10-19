import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarCartService {
  constructor() {}

  openSidebarCart() {
    const sidebarCart = document.querySelector('#sidebarCart') as HTMLElement;
    const body = document.querySelector('body');

    sidebarCart.classList.add('visible');
    body.classList.add('overlay');
    body.classList.add('no-overflow');
  }

  closeSidebarCart() {
    const sidebarCart = document.querySelector('#sidebarCart') as HTMLElement;
    if (sidebarCart) {
      const body = document.querySelector('body');

      sidebarCart.classList.remove('visible');
      body.classList.remove('overlay');
      body.classList.remove('no-overflow');
    }
  }
}
