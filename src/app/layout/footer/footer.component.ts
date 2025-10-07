import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  copyrightDate: Date = new Date()

  constructor() {
  }
}
