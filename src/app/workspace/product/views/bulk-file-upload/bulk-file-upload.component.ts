import {Component, OnInit, ViewChild} from '@angular/core';
import {Divider} from 'primeng/divider';
import {FormsModule, NgForm} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ProgressBar} from 'primeng/progressbar';
import {Toast} from 'primeng/toast';
import {NgIf, DatePipe} from '@angular/common';
import {SessionManagementService} from '../../../../security/session.management.service';
import {MessageService} from 'primeng/api';
import {BulkUploadService} from '../../../../service/bulk-upload/bulk-upload.service';

@Component({
  selector: 'app-bulk-file-upload',
  imports: [Divider, FormsModule, InputText, Button, ProgressBar, Toast, NgIf, DatePipe],
  templateUrl: './bulk-file-upload.component.html',
  styleUrl: './bulk-file-upload.component.scss'
})
export class BulkFileUploadComponent implements OnInit {
  @ViewChild('titleUploadForm', {static: false}) titleUploadForm!: NgForm;
  attachmentFile: any;
  FILE_TYPES = ['xlsx'];
  MAX_FILE_SIZE = 10485760;
  busyState: boolean = false;
  lastUploadedFile: { name: string; size: string; uploadedAt: Date } | null = null;

  constructor(
    private sessionManagementService: SessionManagementService,
    private messageService: MessageService,
    private bulkUploadService: BulkUploadService) {
  }

  ngOnInit() {
    const saved = localStorage.getItem('lastUploadedFile');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.lastUploadedFile = {...parsed, uploadedAt: new Date(parsed.uploadedAt)};
    }
  }

  uploadFile(event: any) {
    this.attachmentFile = event.target.files[0];
  }

  uploadProfile() {
    if (this.isValidFile(this.attachmentFile)) {
      const file = this.attachmentFile;
      const formData = new FormData();
      formData.append('file', file);
      this.attachmentFile = '';
      this.titleUploadForm.resetForm();
      this.busyState = true;

      this.bulkUploadService.uploadProductList(formData).subscribe({
        next: () => {
          this.busyState = false;
          this.lastUploadedFile = {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            uploadedAt: new Date()
          };
          localStorage.setItem('lastUploadedFile', JSON.stringify(this.lastUploadedFile));
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'File uploaded successfully'});
        },
        error: () => {
          this.busyState = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Upload failed. Please check your file.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid file. Only .xlsx files under 10MB are allowed.'
      });
    }
  }

  isValidFile(file: any) {
    return file && (file.size <= this.MAX_FILE_SIZE) &&
      (this.FILE_TYPES.includes(file.name?.substring(file.name?.lastIndexOf('.') + 1)?.toLocaleLowerCase()));
  }
}
