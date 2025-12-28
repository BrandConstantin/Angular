import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { Product } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/product.service';
import { FormErrorLabel } from '@/shared/components/form-error-label/form-error-label';
import { FormUtils } from '@/utils/form-utils';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();
  router = inject(Router);
  fb = inject(FormBuilder);
  productsService = inject(ProductsService);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    //this.productForm.reset(this.product() as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({tags: (formLike.tags || []).join(', ')});
  }

  onSizeClicked(size: string) {
    const currentSizes: string[] = this.productForm.value.sizes || [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  onSubmit() {
    const isValidForm = this.productForm.valid;
    console.log(this.productForm.value, isValidForm);

    this.productForm.markAllAsTouched();
    const formValue = this.productForm.value;

    if (!isValidForm) return;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLocaleLowerCase().split(',').map(tag => tag.trim()) || [],
    };

    console.log('Producto a guardar', productLike);

    if(this.product().id === 'new') {   // crear producto      
      this.productsService.createProduct(productLike).subscribe({
        next: product => {
          console.log('Producto creado', product);
          // navegar al producto editado
          this.router.navigate(['/admin/products', product.id]);
        },
        error: err => {
          console.error('Error creando producto', err);
        }
      });
    } else {    // actualizar producto
      this.productsService.updateProduct(this.product().id, productLike).subscribe({
        next: product => {
          console.log('Producto actualizado', product);
          // navegar al producto editado
          //this.router.navigate(['/admin/products', product.id]);
        },
        error: err => {
          console.error('Error actualizando producto', err);
        }
      });
    }
  }
}
