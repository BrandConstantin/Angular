import { ProductTable } from '@/products/components/product-table/product-table';
import { ProductsService } from '@/products/services/product.service';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage { 
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  currentPageService = this.paginationService.currentPage;
  productsPerPage = signal(9);

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({ 
      page : this.currentPageService(),
      limit: this.productsPerPage(), 
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: (params.page - 1) * 8,
        limit: params.limit,
      });
    }
  })
}
