import { Component, inject, Signal, WritableSignal, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { TagService } from './tag.service'
import { Tag } from './tag.type'

@Component({
  standalone: true,
  selector: 'app-tag-list',
  template: `
    <h2>Gestion des tags</h2>

    <form [formGroup]="tagForm" (ngSubmit)="addTag()">
      <input formControlName="name" placeholder="Nom du tag" />
      <button type="submit" [disabled]="tagForm.invalid">Ajouter</button>
    </form>

    <ul>
      <li *ngFor="let tag of tags()" class="tag">
        <span class="tag-name" (click)="editTag(tag)">{{ tag.name }}</span>
        <span
          class="color-tile"
          [style.backgroundColor]="tag.color || 'black'"
          (click)="editTag(tag)"></span>
        <button (click)="editTag(tag)">✏️</button>
        <button (click)="deleteTag(tag.id)">🗑</button>
      </li>
    </ul>

    <div *ngIf="selectedTag()">
      <h3>Modifier le tag</h3>
      <form [formGroup]="editTagForm" (ngSubmit)="updateTag()">
        <input formControlName="name" placeholder="Nom" />
        <input formControlName="color" type="color" />
        <button type="submit" [disabled]="editTagForm.invalid">Modifier</button>
        <button type="button" (click)="cancelEdit()">Annuler</button>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule],
  styles: `
    .tag
      .tag-name
        margin-right: 5px
        font-weight: 700
      .color-tile
        display: inline-block
        width: 20px
        height: 20px
        margin-bottom: -5px
        margin-right: 5px
  `
})
export class TagListComponent {
  private tagService = inject(TagService)
  private fb = inject(FormBuilder)

  tags: Signal<Tag[]> = this.tagService.tags

  tagForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  })

  editTagForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    color: ['#000000'],
  })

  selectedTag: WritableSignal<Tag | null> = signal(null)

  async addTag() {
    if (this.tagForm.valid) {
      await this.tagService.addTag(this.tagForm.value)
      this.tagForm.reset()
    }
  }

  editTag(tag: Tag) {
    this.selectedTag.set(tag)
    this.editTagForm.setValue({ name: tag.name, color: tag.color || '#000000' })
  }

  async updateTag() {
    const tag = this.selectedTag()
    if (tag && this.editTagForm.valid) {
      await this.tagService.updateTag(tag.id, this.editTagForm.value)
      this.selectedTag.set(null)
    }
  }

  cancelEdit() {
    this.selectedTag.set(null)
  }

  async deleteTag(tagId: string) {
    await this.tagService.deleteTag(tagId)
  }
}