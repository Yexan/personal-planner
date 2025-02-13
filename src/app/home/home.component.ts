import { Component, inject } from '@angular/core'

import { TagChartComponent } from '../tags/tag-chart.component'
import { RoutingService } from '../routing/routing.service'
import { ActivityStore } from '../activities/activity.store'
import { getMonthName } from '../config/months'

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <section class="years">
      @for (year of store.years(); track year) {
        <article class="year">
          <h2 (click)="routingService.goToYear(year)">Année {{ year }}</h2>
          <div class="months">
            @for (month of store.monthsByYear()[year]; track month) {
              <div class="month" (click)="routingService.goToMonth(year, month)">
                <span class="month-name">Mois de {{ getMonthName(month) }}</span>
                <span class="month-activities">({{ store.activitiesCountByMonth()[year][month] || 0 }} activités)</span>
              </div>
            }
          </div>
        </article>
      }
    </section>

    <app-tag-chart
      [data]="store.allTagsStats()"
      title="Répartition globale des activités"></app-tag-chart>
  `,
  imports: [TagChartComponent],
  styles: `
    @use '../styles/mixins'
    @use '../styles/typography'
    :host
      +mixins.flex-row-between-stretch
      gap: 15px

      @media(max-width: 690px)
        +mixins.flex-column-left

      > *
        width: 100%

    .year
      margin: 0 0 20px
      +mixins.glass-surface-card

    h2
      cursor: pointer

    .months
      +mixins.flex-row-left
      flex-wrap: wrap
      gap: 15px
      padding: 1rem

    .month
      +mixins.flex-column-center
      +mixins.glass-surface-card
      cursor: pointer
      +typography.text-gradient

      &:hover
        .month-activities
          color: transparent

    .month-name
      margin-bottom: 10px
      +typography.serif(16, 700)

    .month-activities
      color: #000
      transition: color 0.3s

  `,
})
export class HomeComponent {
  store = inject(ActivityStore)
  routingService = inject(RoutingService)
  getMonthName = getMonthName
}