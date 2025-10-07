import {Component, OnInit, ViewChild} from '@angular/core';
import {Divider} from 'primeng/divider';
import {FormsModule, NgForm} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {BaseComponent} from 'primeng/basecomponent';
import {SessionManagementService} from '../../../../security/session.management.service';
import {MessageService} from 'primeng/api';
import {BulkUploadService} from '../../../../service/bulk-upload/bulk-upload.service';

@Component({
  selector: 'app-bulk-file-upload',
  imports: [
    Divider,
    FormsModule,
    InputText,
    Button
  ],
  templateUrl: './bulk-file-upload.component.html',
  styleUrl: './bulk-file-upload.component.scss'
})
export class BulkFileUploadComponent implements OnInit {
  @ViewChild('titleUploadForm', {static: false}) titleUploadForm!: NgForm
  attachmentFile: any
  FILE_TYPES = ['xlsx']
  MAX_FILE_SIZE = 10485760
  orgId!: number
  busyState: boolean = false;

  constructor(
    private sessionManagementService: SessionManagementService,
    private messageService: MessageService,
    private bulkUploadService: BulkUploadService) {
  }

  ngOnInit() {

  }

  uploadFile(event: any) {
    this.attachmentFile = event.target.files[0]
  }

  uploadProfile() {
    if (this.isValidFile(this.attachmentFile)) {
      const formData = new FormData()
      formData.append('file', this.attachmentFile)
      this.attachmentFile = ''
      this.titleUploadForm.resetForm()
      this.busyState = true;
      this.bulkUploadService.uploadProductList(formData)
        .subscribe({
          next: (response: any) => {
            this.busyState = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Upload successfully',
              detail: 'File uploaded successfully'
            })
          }, error: (err: any) => {
            this.busyState = false;
            this.messageService.add({severity: 'error', detail: 'Invalid File'})
          }
        })
    } else {
      this.busyState = false;
      this.messageService.add({severity: 'error', detail: 'Invalid File'})
    }
  }

  isValidFile(file: any) {
    return file && (file.size <= this.MAX_FILE_SIZE) && (this.FILE_TYPES.includes(file.name?.substring(file.name?.lastIndexOf('.') + 1)?.toLocaleLowerCase()))
  }
}
