import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from '../base.service';
import {environment} from '../../../environments/environment';

const UPLOAD_FILE = `${environment.API_BASE_URL}/products/upload`;

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
