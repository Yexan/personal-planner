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
    <section class="year">
      <h2>Année {{ year }}</h2>
      <ul>
        <li
          *ngFor="let month of store.monthsByYear()[year]"
          (click)="routingService.goToMonth(year, month)">
          Mois de {{ getMonthName(month) }} ({{ store.activitiesCountByMonth()[year][month] || 0 }} activités)
        </li>
      </ul>

      <button (click)="routingService.navigateTo('home')">Retour à l'accueil</button>
    </section>

    <app-tag-chart
      [data]="tagsStats()"
      title="Répartition des activités en {{ year }}"></app-tag-chart>
  `,
  imports: [NgFor, TagChartComponent],
  styles: `
    @use '../styles/mixins'

    :host
      +mixins.flex-row-between-stretch

      @media(max-width: 690px)
        +mixins.flex-column-left

      > *
        width: 100%

    ul
      padding: 0
      list-style: none

    li
      cursor: pointer
  `
})
export class ActivitiesYearComponent {
  private route = inject(ActivatedRoute)
  routingService = inject(RoutingService)
  store = inject(ActivityStore)
  getMonthName = getMonthName

  year = this.route.snapshot.paramMap.get('year')!
  tagsStats = computed(() => this.store.tagsStatsByYear(this.year)())
}