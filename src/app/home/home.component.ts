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
    <section class="years">
      <div *ngFor="let year of store.years()" class="year">
        <h2 (click)="routingService.goToYear(year)">Année {{ year }}</h2>
        <ul>
          <li
            *ngFor="let month of store.monthsByYear()[year]"
            (click)="routingService.goToMonth(year, month)">
            Mois de {{ getMonthName(month) }} ({{ store.activitiesCountByMonth()[year][month] || 0 }} activités)
          </li>
        </ul>
      </div>
    </section>

    <app-tag-chart
      [data]="store.allTagsStats()"
      title="Répartition globale des activités"></app-tag-chart>
  `,
  imports: [NgFor, TagChartComponent],
  styles: `
    @import '../config/mixins'

    :host
      +flex-row-between-stretch

      @media(max-width: 580px)
        +flex-column-left

    h2
      cursor: pointer

      &:first-of-type
        margin-top: 0

    ul
      padding: 0
      list-style: none

    li
      cursor: pointer
  `,
})
export class HomeComponent {
  store = inject(ActivityStore)
  routingService = inject(RoutingService)
  getMonthName = getMonthName
}