import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Gender, Product, ProductsResponse } from "../interfaces/product.interface";
import { forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { User } from "@/auth/interfaces/user.interface";

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  description: '',
  price: 0,
  slug: '',
  stock: 0,
  sizes: [],
  images: [],
  gender: Gender.Unisex,
  tags: [],
  user: {} as User
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  // cache
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const {limit = 9, offset = 0, gender = ''} = options;
    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      }).pipe(
          tap((resp) => console.log(resp)),
          tap((resp) => this.productsCache.set(key, resp))
        );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        tap((resp) => console.log(resp)), 
        tap((resp) => this.productCache.set(idSlug, resp))
      );
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(id: string, product: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    const currentImages = product.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map(imageNames => ({
        ...product, images: [...currentImages, ...imageNames]
      })),
      switchMap((updatedProduct) => 
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)
      ),
      tap((updatedProduct) => {
        this.updateProductCache(updatedProduct);
      })
    );
  }
 
  createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map(imageNames => ({
        ...productLike, images: [...currentImages, ...imageNames]
      })),
      switchMap((newProduct) => 
        this.http.post<Product>(`${baseUrl}/products`, newProduct)
      ),
      tap((newProduct) => {
        this.updateProductCache(newProduct);
      })
    );
  }

  updateProductCache(product: Product) {
    const productId = product.id;
    this.productCache.set(productId, product);
    // invalidar caches de listas que puedan contener este producto
    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) =>
          currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Caché actualizado');
  }

  // subir imagenes a la BBDD
  uploadImages(files?: FileList): Observable<string[]> {
    if (!files ){ return of([]); }

    const  uploadObservable = Array.from(files).map((imageFile => 
      this.uploadImage(imageFile)
    ));
    
    return forkJoin(uploadObservable).pipe(
      tap((imageNames) => console.log('Imágenes subidas', {imageNames}))
    );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<{ fileName: string }>(`${baseUrl}/files/product`, formData).pipe(
      map((response) => response.fileName)
    );
  }
}