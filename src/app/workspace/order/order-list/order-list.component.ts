import {Component, OnInit} from '@angular/core';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {DatePipe, NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';
import {Dialog} from 'primeng/dialog';
import {Divider} from 'primeng/divider';
import {OrderPayload, UpdateStatus} from '../model/order';
import {OrderService} from '../../../service/order/order.service';
import {MessageService} from 'primeng/api';

export type OrderStatus =
  | 'All'
  | 'Pending'
  | 'Confirmed'
  | 'Delivered'
  | 'Cancel';

@Component({
  selector: 'app-order-list',
  imports: [
    SelectButton,
    FormsModule,
    TableModule,
    Button,
    NgIf,
    Tag,
    Dialog,
    Divider,
    DatePipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})

export class OrderListComponent implements OnInit {
  value: OrderStatus = 'All';
  visibleDialog = false;
  selectedOrder: any = null;

  orders: OrderPayload[] = [];
  loading = false;

  page = 1;
  size = 10;
  total = 0;

  paymentOptions: { name: string; value: OrderStatus }[] = [
    {name: 'All', value: 'All'},
    {name: 'Pending', value: 'Pending'},
    {name: 'Confirmed', value: 'Confirmed'},
    {name: 'Delivered', value: 'Delivered'},
    {name: 'Cancel', value: 'Cancel'},
  ];

  stateOptions = [
    {label: 'Yes', value: true},
    {label: 'No', value: false}
  ];


  constructor(private orderService: OrderService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  onStatusChange(): void {
    this.page = 1;
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;

    this.orderService.getOrderList(this.page, this.size, {status: this.value}).subscribe({
      next: (res) => {
        this.orders = res?.data ?? [];
        this.total = res?.total ?? 0;
        this.loading = false;
      },
      error: () => {
        this.orders = [];
        this.total = 0;
        this.loading = false;
      },
    });
  }

  // ✅ Now filter matches exactly (no lowercase compare)
  get filteredOrders(): OrderPayload[] {
    if (this.value === 'All') return this.orders;
    return this.orders.filter((o) => (o.status ?? 'Pending') === this.value);
  }

  onRowSelect(event: any) {
    console.log(event)
    this.selectedOrder = event.data as OrderPayload;
    this.visibleDialog = true;
  }

  getStatusSeverity(status?: string) {
    switch ((status ?? '').toLowerCase()) {
      case 'pending':
        return 'warn';
      case 'delivered':
        return 'success';
      case 'cancel':
        return 'danger';
      case 'confirmed':
        return 'info';
      default:
        return 'danger';
    }
  }

  confirmOrder(order: any) {
    if (order.status === 'Pending' || order.status === 'Cancel') {
      // order.status = 'Confirmed';
      this.updateStatus(order, 'Confirmed');
    }
  }

  completeOrder(order: any) {
    if (order.status === 'Confirmed') {
      // order.status = 'Delivered';
      this.updateStatus(order, 'Delivered');
    }
  }

  cancelOrder(order: any) {
    if (order.status === 'Pending') {
      // order.status = 'Cancel';
      this.updateStatus(order, 'Cancel');
      this.visibleDialog = false;
    }
  }

  private updateStatus(order: OrderPayload, nextStatus: UpdateStatus) {
    const id = (order as any)._id as string;

    this.loading = true;
    this.orderService.updateOrderStatus(id, {
      status: nextStatus,       // ✅ now OK
      listStatus: this.value,   // ✅ 'All' | OrderStatus
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.orders = res?.data ?? [];
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  getCalculatedTotals(order: OrderPayload | null) {
    if (!order) return {subtotal: 0, tax: 0, total: 0};

    const items = order.orderSummary?.items ?? [];

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.totalPrice ?? 0),
      0,
    );

    const tax = Number(order.orderSummary?.tax ?? 0);
    const discount = Number(order.orderSummary?.discount ?? 0);

    const total = subtotal + tax - discount;

    return {subtotal, tax, total};
  }

}
