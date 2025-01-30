import { Component, inject } from '@angular/core'
import { NgFor } from '@angular/common'

import { TagChartComponent } from '../tags/tag-chart.component'
import { RoutingService } from '../routing/routing.service'
import { ActivityStore } from '../activities/activity.store'
import { getMonthName } from '../config/months'

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div *ngFor="let year of store.years()">
      <h2 (click)="routingService.goToYear(year)">{{ year }}</h2>
      <ul>
        <li
          *ngFor="let month of store.monthsByYear()[year]"
          (click)="routingService.goToMonth(year, month)">
          {{ getMonthName(month) }} ({{ store.activitiesCountByMonth()[year][month] || 0 }} activités)
        </li>
      </ul>
    </div>

    <app-tag-chart
      [data]="store.allTagsStats()"
      title="Répartition globale des activités"></app-tag-chart>
  `,
  imports: [NgFor, TagChartComponent]
})
export class HomeComponent {
  store = inject(ActivityStore)
  routingService = inject(RoutingService)
  getMonthName = getMonthName
}