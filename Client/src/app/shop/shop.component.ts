import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { ICategory } from '../shared/models/category';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  categories: ICategory[] = [];
  brands: IBrand[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts() {
    this.shopParams.pageNumber = 1;
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (response) => {
        this.categories = [
          {
            id: null,
            name: 'All',
            icon: null,
          },
          ...response,
        ];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.brands = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    const index = this.shopParams.brandIds.indexOf(brandId);
    if (index === -1) {
      this.shopParams.brandIds.push(brandId);
    } else {
      this.shopParams.brandIds.splice(index, 1);
    }
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onShowMoreClicked() {
    this.shopParams.pageNumber = this.shopParams.pageNumber + 1;
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = [...this.products, ...response.data];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = null;
    this.shopParams.search = null;
    this.getProducts();
  }

  saveCategorySelected(event: any) {
    const list = event.target.closest('ul');
    const listItem = event.target.closest('li');
    list.querySelector('li.active').classList.remove('active');
    listItem.classList.add('active');
    const categoryId = listItem.value;
    this.shopParams.categoryId = categoryId;
  }

  saveBrandSelected(event: any) {
    const brandId = event.target.value;
    const index = this.shopParams.brandIds.indexOf(brandId);
    if (index === -1) {
      this.shopParams.brandIds.push(brandId);
    } else {
      this.shopParams.brandIds.splice(index, 1);
    }
  }

  onApplyFilter() {
    this.getProducts();
    this.closeMobileFilterMenu();
  }

  openMobileFilterMenu() {
    const filterMenu = document.getElementById('mobileFilterMenu');
    filterMenu.style.transform = 'translateX(0)';
    filterMenu.querySelector('.filter-content').scrollTop = 0;

    const body = document.querySelector('body');
    body.classList.add('no-overflow');
  }

  closeMobileFilterMenu() {
    const filterMenu = document.getElementById('mobileFilterMenu');
    filterMenu.style.transform = 'translateX(-100%)';

    const body = document.querySelector('body');
    body.classList.remove('no-overflow');
  }
}
