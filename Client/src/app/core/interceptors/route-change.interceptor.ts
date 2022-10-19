import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SidebarCartService } from '../sidebar-cart/sidebar-cart.service';
import { NavigationStart, Router } from '@angular/router';

@Injectable()
export class RouteChangeInterceptor implements HttpInterceptor {
  constructor(
    private sidebarCartService: SidebarCartService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sidebarCartService.closeSidebarCart();
      }
    });

    return next.handle(request);
  }
}
