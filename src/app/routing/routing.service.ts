import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'

import { RouteNames } from './app.routes'
import { Activity } from '../activities/activity.type'

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  router = inject(Router)

  navigateTo(routeName: RouteNames) {
    this.router.navigate([routeName])
  }

  goToMonth(year: Activity['year'], month: Activity['month']) {
    this.router.navigate(['/activities', year, month])
  }

  goToYear(year: Activity['year']) {
    this.router.navigate(['/activities', year])
  }

  editActivity(activityId: Activity['id']) {
    this.router.navigate(['/activity/edit', activityId])
  }
}
