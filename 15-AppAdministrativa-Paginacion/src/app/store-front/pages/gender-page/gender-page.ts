import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/product.service';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage { 
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  
  gender = toSignal( this.route.params.pipe(map(({ gender }) => gender)) );

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({gender: this.gender(), page : this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: (params.page - 1) * 8,
        limit: 8,
      });
    }
  });
}
