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
    @use './config/mixins'

    :host
      display: block
      +mixins.wrapper(940px)
      background-color: #888

    header
      position: sticky
      top: 0
      +mixins.flex-row-between
      padding: 10px
      color: white
      background: #222

    nav a
      margin-right: 10px
      color: white
      text-decoration: none

    button
      padding: 5px 10px
      color: white
      background: #f44336
      border: none
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
