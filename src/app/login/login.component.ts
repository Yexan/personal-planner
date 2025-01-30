import { Component, inject } from '@angular/core'

import { AuthService } from '../auth/auth.service'
import { RoutingService } from '../routing/routing.service'


@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <h1>Login</h1>
    <button (click)="login()">Login with Google</button>
  `,
})
export class LoginComponent {
  authService = inject(AuthService)
  routingService = inject(RoutingService)

  login() {
    this.authService.loginWithGoogle().then(
      () => this.routingService.navigateTo('home')
    )
  }
}