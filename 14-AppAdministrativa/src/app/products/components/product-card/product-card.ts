import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '../../pipes/product-image.pipe';


@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard { 
  product = input.required<Product>();
  baseFileUrl = "localhost:3000/api/files/product/";

  imageUrl = computed(() => {
    // console.log(">>>>>> ", this.product().images[0].toString());
    return `${this.baseFileUrl}${this.product().images[0]}`;
  });
}
