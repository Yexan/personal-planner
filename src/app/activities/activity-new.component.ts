import { Component, Signal, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'

import { ActivityService } from './activity.service'
import { ActivityWithoutId } from './activity.type'
import { RoutingService } from '../routing/routing.service'
import { createActivityForm } from './activity.form'
import { TagService } from '../tags/tag.service'
import { Tag } from '../tags/tag.type'

@Component({
  selector: 'app-activity-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Nouvelle activité</h1>
    <form [formGroup]="activityForm" (ngSubmit)="onSubmit()">
      <label>
        Nom:
        <input type="text" formControlName="name">
      </label>
      <label>
        Année:
        <input type="text" formControlName="year">
      </label>
      <label>
        Mois:
        <input type="text" formControlName="month">
      </label>
      <label>
        Jour:
        <input type="text" formControlName="day">
      </label>
      <label for="tag">Tag :</label>
      <select formControlName="tag">
        <option *ngFor="let tag of tags()" [value]="tag.name">{{ tag.name }}</option>
      </select>
      <label>
        Détails:
        <textarea formControlName="details"></textarea>
      </label>

      <div class="form-actions">
        <button type="button" (click)="goBackToActivityMonth()">Annuler</button>
        <button type="submit" [disabled]="activityForm.invalid">Ajouter</button>
      </div>
    </form>
  `,
  styles: `
    @use './activity-forms'
  `
})
export class ActivityNewComponent {
  private activityService = inject(ActivityService)
  private routingService = inject(RoutingService)
  private tagService = inject(TagService)
  private fb = inject(FormBuilder)

  tags: Signal<Tag[]> = this.tagService.tags
  activityForm: FormGroup = createActivityForm(this.fb)


  async onSubmit() {
    if (this.activityForm.invalid) return

    const newActivity: ActivityWithoutId = this.activityForm.value as ActivityWithoutId
    await this.activityService.addActivity(newActivity)
    this.routingService.navigateTo('home')
  }

  goBackToActivityMonth() {
    const { year, month } = this.activityForm.value
    if (!!year?.trim() && !!month?.trim()) {
      this.routingService.goToMonth(year, month)
    } else {
      this.routingService.navigateTo('home')
    }
  }
}