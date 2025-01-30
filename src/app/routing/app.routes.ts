import { Routes } from '@angular/router'

import { LoginComponent } from '../login/login.component'
import { HomeComponent } from '../home/home.component'
import { AuthGuard } from '../auth/auth.guard'
import { ActivityNewComponent } from '../activities/activity-new.component'
import { ActivityEditComponent } from '../activities/activity-edit.component'
import { ActivitiesMonthComponent } from '../activities/activities-month.component'
import { ActivitiesYearComponent } from '../activities/activities-year.component'
import { TagListComponent } from '../tags/tag-list.component'

export const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tags', component: TagListComponent, canActivate: [AuthGuard] },
  { path: 'activity/new', component: ActivityNewComponent, canActivate: [AuthGuard] },
  { path: 'activity/edit/:id', component: ActivityEditComponent, canActivate: [AuthGuard] },
  { path: 'activities/:year', component: ActivitiesYearComponent, canActivate: [AuthGuard] },
  { path: 'activities/:year/:month', component: ActivitiesMonthComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
] as const satisfies Routes

export type RouteNames = Exclude<NonNullable<(typeof routes[number]['path'])>, '**'>
