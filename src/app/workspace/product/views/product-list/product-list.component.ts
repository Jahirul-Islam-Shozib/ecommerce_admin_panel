import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {Tag} from 'primeng/tag';
import {Product} from '../../models/product';
import {CurrencyPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {ProductStore} from '../../signal-store/product-store.service';

@Component({
  selector: 'app-product-list',
  imports: [
    TableModule,
    FormsModule,
    Tag,
    Button,
    Toast,
    ConfirmPopup,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  first = 0;
  pageNumber: number = 0
  pageSize: number = 10

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public productStore: ProductStore
  ) {
  }

  ngOnInit() {
    // this.loadProducts();
  }


  loadProducts() {
    this.productStore.loadAllProducts({
      page: this.pageNumber,
      size: this.pageSize
    });
  }

  onDataChange($event: any) {
    this.pageNumber = $event.first / $event.rows + 1
    this.pageSize = $event.rows
    this.loadProducts();
  }


  updateProduct(product: Product) {
    this.router.navigate(['/product/edit', product._id]);
  }

  removeProduct(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Do you want to delete this product?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.productStore.deleteProduct(id);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Product deleted', life: 3000});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }
}
