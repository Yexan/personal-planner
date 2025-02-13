import { Component, Input, computed, inject, signal } from '@angular/core';

import { RoutingService } from '../routing/routing.service';
import { ActivityService } from './activity.service';
import { Activity } from './activity.type';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-activitiy-display',
  template: `
    <article class="activity">
      <div class="activity-content" (click)="toggleOpen()">
        <div class="activity-name">{{ activity.name }}</div>
        <div class="activity-infos">
          {{ activity.tag }} - {{ activity.day }}/{{ activity.month }}/{{ activity.year }}
        </div>
        <div class="activity-details" *ngIf="hasContentToShow()">
          {{ activity.details }}
        </div>
      </div>
      <div class="activity-controls">
        <button (click)="routingService.editActivity(activity.id)">✏️</button>
        <button (click)="deleteActivity(activity.id)" class="delete">🗑</button>
      </div>
    </article>
  `,
  imports: [NgIf],
  styles: `
    @use '../styles/mixins'
    @use '../styles/variables'

    .activity
      +mixins.flex-row-between
      margin: 5px auto 20px
      +mixins.glass-surface-card
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1))
      transition: transform 0.2s, box-shadow 0.2s
      +mixins.animate-slide-in-wiew

      &:hover
        transform: translateY(-2px)
        box-shadow: var(--shadow-md, 0 4px 8px rgba(0,0,0,0.15))

    .activity-content
      flex: 1
      cursor: pointer
      padding-right: 15px

    .activity-name
      font-weight: 700
      font-size: 1.1rem
      margin-bottom: 5px

    .activity-infos
      font-weight: 300
      font-style: italic
      color: var(--text-secondary, #666)

    .activity-details
      margin-top: 10px
      line-height: 1.4

    .activity-controls
      +mixins.flex-row-center
      gap: 8px

      @media (max-width: 460px)
        +mixins.flex-column-center

      button
        +mixins.flex-column-center
        +mixins.w-h(36px)
        border-radius: 50%


    .delete
      +mixins.button(variables.$delete, true)
  `,
})
export class ActivityDisplayComponent {
  activityService = inject(ActivityService)
  routingService = inject(RoutingService)

  @Input() activity!: Activity;
  isOpen = signal(false)

  hasContentToShow = computed(() =>
    (this.activity.details && this.activity.details.trim() !== '' && this.isOpen())
  )

  async deleteActivity(activityId: string) {
    await this.activityService.deleteActivity(activityId)
  }

  toggleOpen() {
    this.isOpen.set(!this.isOpen())
  }
}
