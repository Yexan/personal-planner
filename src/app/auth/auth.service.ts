import { Injectable, inject } from '@angular/core'
import { Auth, authState, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'

import { ObservedValueOf } from '../config/observe-value-of.type'
import { whitelist } from './auth.whitelist'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth)
  user$ = authState(this.auth)

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(this.auth, provider)
  }

  async logout(): Promise<void> {
    await this.auth.signOut()
  }

  isUserAllowed(user: ObservedValueOf<typeof this.user$>): boolean {
    return !!(
      user && user.email && whitelist.indexOf(user.email) !== -1
    )
  }
}
