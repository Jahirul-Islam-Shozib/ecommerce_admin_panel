import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ListStatus, OrderPayload, OrderStatus} from '../../workspace/order/model/order';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface OrderListResponse {
  data: OrderPayload[];
  meta?: {  total: number;  };
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = `${environment.API_BASE_URL}/orders`;

  constructor(private http: HttpClient) {
  }

  getOrderList(
    page: number = 1,
    size: number = 10,
    body?: {
      status?: 'All' | 'Pending' | 'Confirmed' | 'Delivered' | 'Cancel';
      employeeId?: string;
      orderId?: string;
    },
  ): Observable<{ data: OrderPayload[]; total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.post<{ data: OrderPayload[]; total: number }>(
      `${this.baseUrl}/list`,
      body ?? {status: 'All'},
      {params},
    );
  }


  updateOrderStatus(
    id: string,
    payload: {
      status: Exclude<OrderStatus, 'All'>;
      listStatus?: ListStatus;
      employeeId?: string;
      orderId?: string;
      page?: number;
      size?: number;
    },
  ): Observable<OrderListResponse> {
    // if you want backend to return list using page/size
    const params = new HttpParams()
      .set('page', String(payload.page ?? 1))
      .set('size', String(payload.size ?? 10));

    const body = {
      status: payload.status,
      listStatus: payload.listStatus ?? 'All',
      employeeId: payload.employeeId,
      orderId: payload.orderId,
    };

    return this.http.post<OrderListResponse>(`${this.baseUrl}/${id}/status`, body, { params });
  }
}
