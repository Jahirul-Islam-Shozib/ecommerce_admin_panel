import { Injectable } from '@angular/core';
import {SessionManagementService} from "./session.management.service";

@Injectable({
  providedIn: 'root'
})
export class AccessCheckerService {

  constructor(private sessionManagementService: SessionManagementService) { }

  hasAnyRole(roles: string[]) {
    const userRoles = this.sessionManagementService.sessionInfo.userAuthInfo.roleDto.privileges;
    for (let role of roles) {
      if (userRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  hasAccessToEDCR() {
    return true
  }

}
