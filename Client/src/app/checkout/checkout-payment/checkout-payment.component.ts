import { ViewportScroller } from '@angular/common';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component';
import { Basket, IBasket } from 'src/app/shared/models/basket';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  basket: IBasket;
  deliveryMethods: IDeliveryMethod[];
  selectedDeliveryMethod: IDeliveryMethod;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private router: Router,
    private stepper: StepperComponent,
    private viewport: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (basket: IBasket) => {
        this.basket = basket;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
        this.selectedDeliveryMethod = this.deliveryMethods.find((delivery) => {
          delivery.id === this.basket.deliveryMethodId;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe(
      'pk_test_51Ls18zAutsxGXrHXSC084M8GqZoQtzKF5hOzyXQNFsTIpAuKs20L2Vx5fqWipygWvsVZKVoI9Nq1Dpbu1eqBEVDt00NWjHT4zc'
    );
    const elements = this.stripe.elements();
    const elementsOptions = {
      style: {
        base: {
          fontWeight: '400',
          fontFamily: '"Roboto", sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#b1b1b1',
          },
        },
      },
    };

    this.cardNumber = elements.create('cardNumber', {
      placeholder: 'Card number',
      ...elementsOptions,
    });
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry', {
      placeholder: 'Expiration date (MM/YY)',
      ...elementsOptions,
    });
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc', {
      placeholder: 'Security code (CVC)',
      ...elementsOptions,
    });
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  async submitOrder() {
    if (!this.checkoutForm.get('paymentForm').valid) {
      this.checkoutForm.get('paymentForm').markAllAsTouched();
    } else {
      this.loading = true;
      const basket = this.basketService.getCurrentBasketValue();
      try {
        const createdOrder = await this.createOrder(basket);
        const paymentResult = await this.confirmPaymentWithStripe(basket);

        if (paymentResult.paymentIntent) {
          this.basketService.deleteBasket(basket);
          this.basketService.resetBasket();
          const navigationExtras: NavigationExtras = { state: createdOrder };
          this.router.navigate(['checkout/success'], navigationExtras);
        } else {
          this.cardErrors = paymentResult.error.message;
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  }

  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value,
        },
      },
    });
  }

  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return lastValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }

    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }

  goToAddressStep() {
    this.stepper.selectedIndex = 0;
    this.viewport.scrollToPosition([0, 0]);
  }

  goToDeliveryStep() {
    this.stepper.selectedIndex = 1;
    this.viewport.scrollToPosition([0, 0]);
  }
}
