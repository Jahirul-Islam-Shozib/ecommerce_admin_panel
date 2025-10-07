import {Injectable} from '@angular/core'
import {AuthService} from '../service/auth/auth.service';
import {UserAuthInfo} from '../domain/user.auth.info';

class SessionInfo {
  isAuthenticated: boolean
  userAuthInfo: UserAuthInfo

  constructor(isAuthenticated: boolean, userAuthInfo: UserAuthInfo) {
    this.isAuthenticated = isAuthenticated
    this.userAuthInfo = userAuthInfo
  }
}

@Injectable({
  providedIn: 'root'
})

export class SessionManagementService {

  sessionInfo: SessionInfo

  constructor(private authService: AuthService) {
    this.sessionInfo = new SessionInfo(false, new UserAuthInfo())
  }

  init() {
    return new Promise((resolve, reject) => {
      this.authService.authInfo().subscribe({
        next: response => {
          const userAuthInfo: UserAuthInfo = response
          this.sessionInfo = new SessionInfo(true, userAuthInfo)
          resolve(true)
        },
        error: error => {
          this.sessionInfo = new SessionInfo(false, new UserAuthInfo())
          resolve(true)
        }
      })
    })
  }

  refreshSession() {
    return new Promise((resolve, reject) => {
      this.authService.authInfo().subscribe({
        next: response => {
          const userAuthInfo: UserAuthInfo = response
          this.sessionInfo = new SessionInfo(true, userAuthInfo)
          resolve(true)
        },
        error: error => {
          this.sessionInfo = new SessionInfo(false, new UserAuthInfo())
          resolve(true)
        }
      })
    })
  }

  loggedOut(is401Error: boolean = false) {
    this.sessionInfo = new SessionInfo(false, new UserAuthInfo())
    localStorage.removeItem('userToken')
  }
}
