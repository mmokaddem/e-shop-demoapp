import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  nextSlideInterval: NodeJS.Timeout;

  constructor() {}

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

  ngOnInit(): void {}

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
}
