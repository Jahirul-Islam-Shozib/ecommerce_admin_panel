import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {UserService} from '../../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-create-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    Select,
    Button,
    NgIf
  ],
  templateUrl: './user-create-form.component.html',
  styleUrl: './user-create-form.component.scss'
})
export class UserCreateFormComponent implements OnInit {
  userForm!: FormGroup;

  userId: string | null = null;
  isEdit = false;

  companyOptions = [
    {label: 'Square Toiletries Limited', value: 'Square Toiletries Limited'},
    {label: 'Square Food & Beverage Ltd', value: 'Square Food & Beverage Ltd'},
    {label: 'Square Health Limited', value: 'Square Health Limited'},
    {label: 'Square Pharmaceuticals Limited', value: 'Square Pharmaceuticals Limited'},
    {label: 'Square Textile Limited', value: 'Square Textile Limited'},
    {label: 'Square Informatix Limited', value: 'Square Informatix Limited'}
  ];

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe(params => {
      this.userId = params['id'];

      if (this.userId) {
        this.isEdit = true;
        this.loadUser();
      }
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      employeeId: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+88)?01[3-9]\d{8}$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  loadUser() {
    this.userService.getUserById(this.userId!).subscribe({
      next: (res: any) => {
        const data = res.data || res; // supports both structure types

        this.userForm.patchValue({
          name: data.name,
          company: data.company,
          employeeId: data.employeeId,
          designation: data.designation,
          department: data.department,
          phone: data.phone,
          email: data.email,
        });

        // In update mode, password should not be required
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => console.error(err)
    });
  }


  onSubmit() {
    if (this.userForm.invalid) return;

    const payload = this.userForm.value;

    if (this.isEdit) {
      this.userService.updateUser(this.userId!, payload).subscribe({
        next: () => {
          this.router.navigate(['/user/list']);
        },
        error: (err) => console.error(err)
      });
    } else {
      this.userService.createUser(payload).subscribe({
        next: () => {
          this.router.navigate(['/user/list']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
