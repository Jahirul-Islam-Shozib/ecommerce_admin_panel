import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {StyleClassModule} from 'primeng/styleclass';
import {MenuItem} from 'primeng/api';
import {TieredMenu} from 'primeng/tieredmenu';
import {LayoutService} from '../../service/layout.service';
import {BaseComponent} from 'primeng/basecomponent';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, TieredMenu],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent extends BaseComponent implements OnInit{
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {
    super();
    this.items = [
      {
        label: "User",
        icon: 'pi pi-user',
        items: [
          {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            styleClass: 'without-drop-down',
            command: (event) => {
              this.logout();
            }
          }
        ]
      },

    ]}


  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
  logout() {
    // this.authService.logout().subscribe({
    //   next: response => {
    //     this.sessionManagementService.loggedOut()
    //     localStorage.removeItem('workspace');
    //     this.router.navigate(['auth/login'])
    //   },
    //   error: error => {
    //     if (error.status === 401) {
    //       this.sessionManagementService.loggedOut()
    //       this.router.navigate(['auth/login'])
    //     }
    //   }
    // })
  }
}
