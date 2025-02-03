import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { AuthService } from './auth/auth.service'
import { RoutingService } from './routing/routing.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
     <header *ngIf="authService.user$ | async as user">
      <nav>
        <a routerLink="/home">Accueil</a>
        <a routerLink="/activity/new">Nouvelle activité</a>
        <a routerLink="/tags">Gérer les tags</a>
      </nav>
      <button (click)="logout()">Se déconnecter</button>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
    @import './config/mixins'

    :host
      display: block
      +wrapper(940px)
      background-color: #888

    header
      display: flex
      justify-content: space-between
      align-items: center
      padding: 10px
      background: #222
      color: white

    nav a
      margin-right: 10px
      color: white
      text-decoration: none

    button
      background: #f44336
      color: white
      border: none
      padding: 5px 10px
      cursor: pointer

    main
      padding: 15px
  `
})
export class AppComponent {
  authService = inject(AuthService)
  routingService = inject(RoutingService)

  logout() {
    this.authService.logout().then(
      () => this.routingService.navigateTo('login')
    )
  }
}
