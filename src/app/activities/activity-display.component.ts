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
    @use '../config/mixins'

    .activity
      +mixins.flex-row-between
      margin: 5px auto 20px
      padding: 15px
      background-color: #ccc

    .activity-content
      flex: 1
      cursor: pointer

    .activity-name
      font-weight: 700

    .activity-infos
      font-weight: 300
      font-style: italic

    .activity-details
      margin-top: 10px

    .activity-controls
      +mixins.flex-row-center
      gap: 5px

      @media (max-width: 460px)
        +mixins.flex-column-center

    .delete
      +mixins.button(#FFCCBC)
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
