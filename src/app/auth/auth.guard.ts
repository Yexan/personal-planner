import { Injectable, inject } from '@angular/core'
import { CanActivate } from '@angular/router'
import { map, Observable } from 'rxjs'

import { RoutingService } from '../routing/routing.service'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService)
  routingService = inject(RoutingService)

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => {
        if (this.authService.isUserAllowed(user)) return true
        this.routingService.navigateTo('login')
        return false
      })
    )
  }
}