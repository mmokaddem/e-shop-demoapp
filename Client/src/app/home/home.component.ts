import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  nextSlideInterval: NodeJS.Timeout;
  products: IProduct[] = [];

  constructor(private shopService: ShopService) {}

  ngAfterViewInit(): void {
    const carouselButtons = document.querySelectorAll(
      '.carousel-btn'
    ) as NodeListOf<HTMLButtonElement>;

    if (carouselButtons) {
      carouselButtons.forEach((button) => {
        button.addEventListener('click', () =>
          this.onCarouselButtonClicked(button)
        );
      });
    }

    this.nextSlideInterval = setInterval(() => this.toNextSlide(), 3000);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const shopParams = new ShopParams();
    this.shopService.getProducts(shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onCarouselButtonClicked(button: HTMLButtonElement) {
    const targetNr = button.getAttribute('data-target');
    const activeItem = document.querySelector('.carousel-item.active');
    const activeButton = document.querySelector('.carousel-btn.active');
    const targetItem = document.querySelector(
      `.carousel-item:nth-child(${targetNr})`
    );

    activeItem.classList.remove('active');
    targetItem.classList.add('active');
    activeButton.classList.remove('active');
    button.classList.add('active');
  }

  toNextSlide() {
    const activeButton = document.querySelector('.carousel-btn.active');
    let targetNr = +activeButton.getAttribute('data-target') + 1;

    if (targetNr > 3) {
      targetNr = 1;
    }

    const targetBtn = document.querySelector(
      `.carousel-btn[data-target='${targetNr}']`
    ) as HTMLButtonElement;
    this.onCarouselButtonClicked(targetBtn);
  }

  ngOnDestroy(): void {
    clearInterval(this.nextSlideInterval);
  }

  translateList(event, direction: 'previous' | 'next') {
    const section = event.target.closest('section');
    const productsList = section.querySelector('ul');
    const productItems = productsList.querySelectorAll('app-product-item');
    const transCount =
      +productsList.getAttribute('translation-count') +
      (direction === 'previous' ? -1 : 1);

    // Translate the items
    productItems.forEach((item) => {
      item.style.transform = `translateX(calc((-100% - 1rem) * ${transCount}))`;
    });

    productsList.setAttribute('translation-count', transCount);

    // Calculate how many items are currently displayed
    const itemWidth =
      productsList.querySelector('app-product-item').offsetWidth;
    const showedCount = Math.round(
      productsList.getBoundingClientRect().width / itemWidth
    );

    // Disable the button if there is no more elments to display
    const nextButton = section.querySelector('#nextButton');
    const previousButton = section.querySelector('#previousButton');
    if (productItems.length === showedCount + transCount) {
      nextButton.disabled = true;
    } else if (transCount === 0) {
      previousButton.disabled = true;
    } else {
      nextButton.disabled = false;
      previousButton.disabled = false;
    }
  }
}
