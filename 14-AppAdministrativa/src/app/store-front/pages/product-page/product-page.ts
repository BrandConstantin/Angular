import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { ProductsService } from '@/products/services/product.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({idSlug: this.productIdSlug}),
    stream: ({ params }) => this.productService.getProductById(params.idSlug),
  });
}
