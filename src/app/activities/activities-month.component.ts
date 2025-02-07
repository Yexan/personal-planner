import { Component, computed, inject, Signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgFor } from '@angular/common'

import { ActivityDisplayComponent } from './activity-display.component'
import { TagChartComponent } from '../tags/tag-chart.component'
import { RoutingService } from '../routing/routing.service'
import { ActivityStore } from './activity.store'
import { Activity } from './activity.type'
import { getMonthName } from '../config/months'

@Component({
  standalone: true,
  selector: 'app-activities-month',
  template: `
    <section>
      <h2>{{ monthName() }} {{ year }}</h2>
      <ng-container *ngFor="let activity of activities()">
        <app-activitiy-display [activity]="activity"></app-activitiy-display>
      </ng-container>

      <button (click)="routingService.goToYear(year)">Retour en {{ year }}</button>
    </section>

    <app-tag-chart
      [data]="tagsStats()"
      title="Répartition des activités en {{monthName()}} {{ year }}"></app-tag-chart>
  `,
  imports: [NgFor, ActivityDisplayComponent, TagChartComponent],
  styles: `
    @use '../config/mixins'

    :host
      +mixins.flex-column-left
      gap: 30px
      padding-bottom: 50px

      > *
        width: 100%

      @media(min-width: 760px)
        +mixins.flex-row-top

        section
          flex: 2

        app-tag-chart
          flex: 1
          position: sticky
          top: calc(50% - 150px)

    button,
    app-tag-chart
      +mixins.animate-slide-in-wiew

  `
})
export class ActivitiesMonthComponent {
  private route = inject(ActivatedRoute)
  private store = inject(ActivityStore)
  routingService = inject(RoutingService)

  year = this.route.snapshot.paramMap.get('year')!
  month = this.route.snapshot.paramMap.get('month')!

  monthName = computed(() => getMonthName(this.month))
  tagsStats = computed(() => this.store.tagsStatsByMonth(this.year, this.month)())

  activities: Signal<Activity[]> = computed(() =>
    this.store.activitiesByYearAndMonth()[this.year][this.month] || []
  )
}