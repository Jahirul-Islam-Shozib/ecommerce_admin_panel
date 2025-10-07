import {Injectable} from '@angular/core';
import {Product} from '../../workspace/product/models/product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = `${environment.API_BASE_URL}/products`;

  constructor(private http: HttpClient) {
  }

  getAllProducts(page: number = 0, size: number = 10, brands?: string[]): Observable<{ data: Product[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const body = { brands: brands ?? [] };

    return this.http.post<{ data: Product[], total: number }>(`${this.baseUrl}/list`, body, {params});
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.baseUrl, product);
  }

  getProductById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
