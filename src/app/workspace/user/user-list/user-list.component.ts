import {Component, OnInit} from '@angular/core';
import {Toast} from 'primeng/toast';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {Button} from 'primeng/button';
import {first} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../service/user/user.service';
import {User} from '../model/user';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-list',
  imports: [
    Toast,
    ConfirmPopup,
    Button,
    TableModule,
    RouterLink
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  loading = false;
  userList: User[] = [];

  constructor(private router: Router,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) {
  }


  ngOnInit() {
    // this.loadUsers(0, this.pageSize);
  }

  // PrimeNG lazy event handler
  onDataChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;

    const pageIndex = event.first; // starting row index
    const size = event.rows;

    this.loadUsers(pageIndex, size);
  }

  private loadUsers(first: number, rows: number) {
    this.loading = true;

    // backend expects 1-based page index
    const page = first / rows + 1;

    this.userService.getUsers(page, rows).subscribe({
      next: (res) => {
        this.userList = res.data;
        this.totalRecords = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.loading = false;
      }
    });
  }

  updateEmployee(emp: any) {
    this.router.navigate(['/user/edit', emp._id]);
  }

  removeEmployee(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this employee?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-text p-button-sm',
      accept: () => {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Employee deleted successfully',
            });
            // reload current page
            const pageIndex = this.first / this.pageSize;
            this.loadUsers(pageIndex, this.pageSize);
          },
          error: (err) => {
            console.error('Delete failed', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete employee',
            });
          }
        });
      }
    });
  }

}
