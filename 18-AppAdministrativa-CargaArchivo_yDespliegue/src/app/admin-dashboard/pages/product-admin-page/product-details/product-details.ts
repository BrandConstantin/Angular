import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { Product } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/product.service';
import { FormErrorLabel } from '@/shared/components/form-error-label/form-error-label';
import { FormUtils } from '@/utils/form-utils';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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

  wasSaved = signal(false);
  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);

  imagesToCarousel = computed(() => {
    const currentProductImages: string[] = this.product().images || [];
    const tempImages: string[] = this.tempImages(); 
    return [...currentProductImages, ...tempImages];
  });

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

  async onSubmit() {
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
      try{
        const product = await firstValueFrom(this.productsService.createProduct(productLike, this.imageFileList));
        console.log('Producto creado', product);

        // navegar al producto editado
        this.router.navigate(['/admin/products', product.id]);
      } catch(error) {
        console.error('Error al crear el producto', error);
      }
    } else {    // actualizar producto
      try {
        await firstValueFrom(
          this.productsService.updateProduct(this.product().id, productLike, this.imageFileList)
        );
      } catch (error) {
        console.error('Error al actualizar el producto', error);
      }
    }

    this.wasSavedFunction();
  }

  private wasSavedFunction() {
    this.wasSaved.set(true);

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList? fileList : undefined;

    const imageUrls = Array.from(fileList ?? []).map(file => URL.createObjectURL(file));  
    console.log('Archivos seleccionados', imageUrls);

    this.tempImages.set(imageUrls);
  }
}
