import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/product.service';
import { Pagination } from '@/shared/components/pagination/pagination';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage { 
  productsService = inject(ProductsService);

  activatedRoute = inject(ActivatedRoute);
  currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((params) => (params.get('page') ? +params.get('page')! : 1)),
    map((page) => (isNaN(page) || page < 1 ? 1 : page))
   ),
   { initialValue: 1 }
  );

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({ page : this.currentPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: (params.page - 1) * 8,
        limit: 8,
      });
    }
  })
}
