import { Component, Input, inject } from '@angular/core';

import { RoutingService } from '../routing/routing.service';
import { ActivityService } from './activity.service';
import { Activity } from './activity.type';

@Component({
  standalone: true,
  selector: 'app-activitiy-display',
  template: `
    <div class="activity">
      <div class="activity-name">{{ activity.name }}</div>
      <div class="activity-infos">
        {{ activity.tag }} - {{ activity.day }}/{{ activity.month }}/{{ activity.year }}
      </div>
      <button (click)="routingService.editActivity(activity.id)">Modifier</button>
      <button (click)="deleteActivity(activity.id)">Supprimer</button>
    </div>
  `,
  styles: `
    .activity
      margin: 5px auto 20px
      padding: 15px
      background-color: #ccc

    .activity-name
      font-weight: 700

    .activity-infos
      font-weight: 300
      font-style: italic

    button
      margin-top: 5px
      padding: 5px 10px
      border: none
      cursor: pointer
  `,
})
export class ActivityDisplayComponent {
  activityService = inject(ActivityService)
  routingService = inject(RoutingService)

  @Input() activity!: Activity;

  async deleteActivity(activityId: string) {
    await this.activityService.deleteActivity(activityId);
  }
}
