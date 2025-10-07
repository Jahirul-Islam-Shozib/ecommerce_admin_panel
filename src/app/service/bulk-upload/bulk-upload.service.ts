import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from '../base.service';

const UPLOAD_FILE = 'http://localhost:3000/products/upload'

@Injectable({
  providedIn: 'root'
})
export class BulkUploadService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public uploadProductList(formData: any): Observable<any> {
    return this.httpClient.post(UPLOAD_FILE, formData);
  }
}
