import { Component, computed, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgFor } from '@angular/common'

import { TagChartComponent } from '../tags/tag-chart.component'
import { RoutingService } from '../routing/routing.service'
import { ActivityStore } from './activity.store'
import { getMonthName } from '../config/months'

@Component({
  standalone: true,
  selector: 'app-activities-year',
  template: `
    <h2>{{ year }}</h2>
    <ul>
      <li
        *ngFor="let month of store.monthsByYear()[year]"
        (click)="routingService.goToMonth(year, month)">
        {{ getMonthName(month) }} ({{ store.activitiesCountByMonth()[year][month] || 0 }} activités)
      </li>
    </ul>

    <button (click)="routingService.navigateTo('home')">Retour à l'accueil</button>

    <app-tag-chart
      [data]="tagsStats()"
      title="Répartition des activités en {{ year }}"></app-tag-chart>
  `,
  imports: [NgFor, TagChartComponent]
})
export class ActivitiesYearComponent {
  private route = inject(ActivatedRoute)
  routingService = inject(RoutingService)
  store = inject(ActivityStore)
  getMonthName = getMonthName

  year = this.route.snapshot.paramMap.get('year')!
  tagsStats = computed(() => this.store.tagsStatsByYear(this.year)())
}