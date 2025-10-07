import {Injectable} from '@angular/core';
import {Product} from '../../workspace/product/models/product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts(page: number = 0, size: number = 10): Observable<{ data: Product[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ data: Product[], total: number }>('http://localhost:3000/products', {params});
  }

  addProduct(product: Product) {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  getProductById(id: string) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
