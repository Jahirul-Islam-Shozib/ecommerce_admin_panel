import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {Product} from '../../models/product';
import {ActivatedRoute} from '@angular/router';
import {InputGroup} from 'primeng/inputgroup';
import {ProductStore} from '../../signal-store/product-store.service';
import {Select} from 'primeng/select';
import {ProductService} from '../../../../service/product/product.service';
import {removeBackground} from '@imgly/background-removal';


@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    InputNumber,
    DropdownModule,
    Button,
    NgIf,
    InputGroup,
    Select
  ],
  templateUrl: './product-form.component.html',
  standalone: true,
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  productId: string | null = null;
  selectedProduct!: Product;


  statusOptions = [
    {label: 'In Stock', value: 'INSTOCK'},
    {label: 'Low Stock', value: 'LOWSTOCK'},
    {label: 'Out of Stock', value: 'OUTOFSTOCK'}
  ];

  companyOptions = [
    {label: 'Square Toiletries Limited', value: 'Square Toiletries Limited'},
    {label: 'Square Food & Beverage Ltd', value: 'Square Food & Beverage Ltd'},
    {label: 'Sabazpur Tea Company Ltd', value: 'Sabazpur Tea Company Ltd'}
  ];

  brandOptions = [
    {label: 'Radhuni', value: 'Radhuni'},
    {label: 'Ruchi', value: 'Ruchi'},
    {label: 'Chashi', value: 'Chashi'},
    {label: 'Chopstick', value: 'Chopstick'},
    {label: 'Meril', value: 'Meril'},
    {label: 'Kool', value: 'Kool'},
    {label: 'Sepnil', value: 'Sepnil'},
    {label: 'Senora', value: 'Senora'},
    {label: 'Chamak', value: 'Chamak'},
    {label: 'Jui', value: 'Jui'},
    {label: 'Magic', value: 'Magic'},
    {label: 'Maya', value: 'Maya'},
    {label: 'Revive', value: 'Revive'},
    {label: 'Xpel', value: 'Xpel'},
    {label: 'Femina', value: 'Femina'},
    {label: 'Shakti', value: 'Shakti'}
  ];

  weightUnits = [
    {label: 'gm', value: 'gm'},
    {label: 'ml', value: 'ml'},
    {label: 'kg', value: 'kg'},
    {label: 'liter', value: 'liter'}
  ];

  mode: string = 'Create';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public productStore: ProductStore,
              private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.initProductForm();

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.mode = 'Update';
        this.productService.getProductById(this.productId).subscribe({
          next: (productData) => {
            this.selectedProduct = <Product>productData;
            this.fillForm(this.selectedProduct)
          },
          error: (error) => {
          }
        })
      }
    });
  }

  private fillForm(product: Product) {
    if (!product) return;
    this.productForm.patchValue(product);
    this.previewUrl = product.image || `data:image/png;base64,${product.image}`;
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      company: ['', Validators.required],
      image: ['', Validators.required],
      discountedPrice: [null, [Validators.required, Validators.min(0)]],
      originalPrice: [null],
      weightValue: ['', Validators.required],
      weightUnit: ['gm', Validators.required],
      inventoryStatus: ['', Validators.required]
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // const imageWithNoBg = await removeBackground(file);
      const reader = new FileReader();
      reader.onload = () => {
        // Convert image to base64 string
        const base64String = (reader.result as string).split(',')[1];
        this.productForm.patchValue({image: base64String});
        this.previewUrl = reader.result; // For preview
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.productId) {
      this.productStore.updateProduct(this.productId, this.productForm.value);
    } else {
      this.productStore.addProduct(this.productForm.value);
    }
    // this.resetForm();
  }

  private resetForm() {
    this.productForm.reset();
    this.previewUrl = null;
  }

}
