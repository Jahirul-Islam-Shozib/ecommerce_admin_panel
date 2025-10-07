import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MenuitemComponent} from '../menuitem/menuitem.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AccessCheckerService} from '../../security/access-checker.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, MenuitemComponent],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('openClose', [
      state('show', style({height: '*'})),
      state('hide', style({height: '0px'})),
      transition('show <=> hide', animate(300))
    ])
  ],
})
export class MenuComponent implements OnInit {
  model: MenuItem[] = [];

  constructor(private accessChecker: AccessCheckerService, private router: Router) {
  }

  ngOnInit() {
    this.model = [
      {
        label: '',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
        ]
      },
      {
        label: this.accessChecker.hasAccessToEDCR() ? 'Products' : undefined,
        items: [
          {
            label: 'Product List', icon: 'pi pi-clone', routerLink: ['/product/list'],
            visible: this.accessChecker.hasAccessToEDCR()
          },
          {
            label: 'Create Product', icon: 'pi pi-clone', routerLink: ['/product/add'],
            visible: this.accessChecker.hasAccessToEDCR()
          },
          {
            label: 'Upload File', icon: 'pi pi-clone', routerLink: ['/product/upload'],
            visible: this.accessChecker.hasAccessToEDCR()
          }
        ],
        visible: true
      },
    ];
  }


  onKeydown(event: KeyboardEvent) {
    const nodeElement = (<HTMLDivElement>event.target);
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }

  toggleItem(index: number) {
    const item = this.model[index];
    const url = this.router.url.split('#')[0];

    const itemHasMultipleSubitems = item.items && item.items.length > 1;

    item.visible = !item.visible;

    if (item.visible) {
      this.model.forEach((otherItem, idx) => {
        if (idx !== index && otherItem.items && otherItem.items.length > 1) {
          otherItem.visible = otherItem.items.some(subItem => {
            return url.includes(subItem.routerLink) ||
              (!(!subItem['children'] || !subItem['children'].some((childItem: { routerLink: string; }) => url.includes(childItem.routerLink))));
          });
        }
      });
    }
  }

}
