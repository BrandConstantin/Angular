import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product, ProductsResponse } from "../interfaces/product.interface";
import { Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment.development";

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

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
    /*if (id === 'new') {
      return of(emptyProduct);
    }*/

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    console.log('Updating product...', product);

    return this.http.patch<Product>(`${baseUrl}/products/${id}`, product).pipe(
      tap((updatedProduct) => {
        this.updateProductCache(updatedProduct);
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
}