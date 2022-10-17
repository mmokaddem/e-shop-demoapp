export class ShopParams {
  categoryId: number = null;
  brandIds: number[] = [];
  sort = 'name';
  pageNumber = 1;
  pageSize = 10;
  search: string;
}
