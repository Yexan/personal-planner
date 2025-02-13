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
        <a routerLinkActive="active" routerLink="/home">Accueil</a>
        <a routerLinkActive="active" routerLink="/activity/new">Nouvelle activité</a>
        <a routerLinkActive="active" routerLink="/tags">Gérer les tags</a>
      </nav>
      <button (click)="logout()"><span class="label">Se déconnecter</span><span class="icon">⏻</span></button>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
    @use './styles/mixins'
    @use './styles/typography'

    :host
      display: block
      +mixins.wrapper(940px)
      +mixins.glass-surface
      border-radius: 0 0 var(--surface-radius) var(--surface-radius)

    header
      position: sticky
      top: 0
      +mixins.flex-row-between
      padding: 10px
      color: white
      background: var(--surface)
      box-shadow: var(--shadow-sm)
      z-index: 10

    nav a
      position: relative
      text-decoration: none
      padding: 1rem
      +typography.serif
      background-blend-mode: luminosity
      +typography.text-gradient

      &:after
        content: ''
        position: absolute
        bottom: 0
        left: 50%
        width: 0
        height: 2px
        transition: width 0.3s, left 0.3s

      &:hover,
      &:focus,
      &:active,
      &.active
        background-blend-mode: normal

        &:after
          left:0
          width: 100%

    button
      padding: 5px 10px
      color: white
      font-weight: 900
      +typography.serif
      background: var(--error)
      border: none
      border-radius: 4px
      cursor: pointer
      transition: opacity 0.3s

      &:hover
        opacity: 0.8

      .label
        margin-right: 5px
        font-weight: 500

      @media(max-width: 600px)
        .label
          display: none

    main
      margin-bottom: 40px
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
