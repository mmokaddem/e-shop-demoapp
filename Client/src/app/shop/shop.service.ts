import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.categoryId) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }

    if (shopParams.brandIds) {
      params = params.append('brandIds', shopParams.brandIds.join(', '));
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'products/categories');
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
}
