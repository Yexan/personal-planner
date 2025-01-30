import { Component, inject, OnInit, Signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'

import { RoutingService } from '../routing/routing.service'
import { ActivityService } from './activity.service'
import { ActivityStore } from './activity.store'
import { createActivityForm } from './activity.form'
import { TagService } from '../tags/tag.service'
import { Tag } from '../tags/tag.type'

@Component({
  selector: 'app-activity-edit',
  standalone: true,
  template: `
    <h2>Modifier une activité</h2>
    <form [formGroup]="activityForm" (ngSubmit)="saveActivity()">
      <label>
        Nom :
        <input formControlName="name" type="text" />
      </label>

      <label>
        Année :
        <input formControlName="year" type="text" />
      </label>

      <label>
        Mois :
        <input formControlName="month" type="text" />
      </label>

      <label>
        Jour :
        <input formControlName="day" type="text" />
      </label>

      <label for="tag">Tag :</label>
      <select formControlName="tag">
        <option *ngFor="let tag of tags()" [value]="tag.name">{{ tag.name }}</option>
      </select>

      <label>
        Détails :
        <textarea formControlName="details"></textarea>
      </label>

      <button type="submit" [disabled]="activityForm.invalid">Enregistrer</button>
      <button type="button" (click)="routingService.navigateTo('home')">Annuler</button>
    </form>
  `,
  styles: `
  form
    display: flex
    flex-direction: column
    gap: 10px
    max-width: 300px

  input, select, textarea
    width: 100%

`,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ActivityEditComponent implements OnInit {
  private route = inject(ActivatedRoute)
  routingService = inject(RoutingService)
  private fb = inject(FormBuilder)
  private activityService = inject(ActivityService)
  private store = inject(ActivityStore)
  private tagService = inject(TagService)

  tags: Signal<Tag[]> = this.tagService.tags

  activityForm!: FormGroup
  activityId!: string

  ngOnInit() {
    this.activityId = this.route.snapshot.paramMap.get('id')!
    const activity = this.store.getActivity(this.activityId)

    if (!activity) {
      this.routingService.navigateTo('home')
      return
    }

    this.activityForm = createActivityForm(this.fb, activity)
  }

  async saveActivity() {
    if (this.activityForm.valid) {
      await this.activityService.updateActivity(this.activityId, this.activityForm.value)
      this.routingService.navigateTo('home')
    }
  }
}