import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/product.service';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage { 
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // activatedRoute = inject(ActivatedRoute);
  // currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
  //   map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //   map((page) => (isNaN(page) || page < 1 ? 1 : page))
  //  ),
  //  { initialValue: 1 }
  // );

  currentPageService = this.paginationService.currentPage;

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({ page : this.currentPageService() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: (params.page - 1) * 8,
        limit: 8,
      });
    }
  })
}
