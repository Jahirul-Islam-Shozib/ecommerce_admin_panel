import {computed, Injectable, signal} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../../../service/product/product.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private _products = signal<Product[]>([]);
  private _total = signal<number>(0);

  products = computed(() => this._products());
  total = computed(() => this._total());


  // selectedProduct: WritableSignal<Product | null> = signal<Product | null>(null);

  constructor(private productService: ProductService,
              private router: Router) {
  }

  loadAllProducts(params: { page?: number; size?: number } = {}): void {
    const { page = 0, size = 10 } = params;

    this.productService.getAllProducts(page, size).subscribe({
      next: (res) => {
        this._products.set(res.data);
        this._total.set(res.total);
      },
      error: (error) => console.error('Failed to load products', error),
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: data => {
        this._products.update(products => products.filter(p => p._id !== id));
      },
      error: error => console.log(error),
    })
  }

  // setSelectedProductById(productId: string) {
  //   this.productService.getProductById(productId).subscribe({
  //     next: (productData) => {
  //       const product = productData as Product;
  //       this.selectedProduct.set(product);
  //     },
  //     error: (err) => console.error('Failed to fetch product', err)
  //   });
  // }

  addProduct(newProduct: Product) {
    this.productService.addProduct(newProduct).subscribe({
      next: (data: any) => {
        this._products.update(products => [...products, data]);
        this.router.navigate(['/product/list']);
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }


  updateProduct(updatedProductId: any, updatedProduct: Product): void {
    this.productService.updateProduct(updatedProductId, updatedProduct).subscribe({
      next: data => {
        this._products.update(products =>
          products.map(p => p._id === updatedProduct._id ? updatedProduct : p)
        );
        this.router.navigate(['/product/list']);
        // this.selectedProduct.set(null);
      },
      error: (err) => console.error('Update failed', err)
    });
  }
}
