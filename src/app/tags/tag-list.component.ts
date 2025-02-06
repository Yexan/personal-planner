import { Component, inject, Signal, WritableSignal, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { TagService } from './tag.service'
import { Tag } from './tag.type'

@Component({
  standalone: true,
  selector: 'app-tag-list',
  template: `
    <section class="new-tag">
      <h2>Ajouter tags</h2>

      <form [formGroup]="tagForm" (ngSubmit)="addTag()">
        <input formControlName="name" placeholder="Nom du tag" />
        <div class="form-actions">
          <button type="submit" [disabled]="tagForm.invalid">Ajouter</button>
        </div>
      </form>
    </section>

    <section class="list-tag">
      <h2>Tags existants</h2>
      <ul class="tags">
        <li
          *ngFor="let tag of tags()"
          class="tag"
          (click)="editTag(tag)"
          [style.--tag-color]="tag.color || '#000'"
          [class.active]="tag.id === selectedTag()?.id">
          <div class="tag-infos">
            <span class="color-tile"></span>
            <span class="tag-name">{{ tag.name }}</span>
          </div>
          <div class="form-actions">
            <button (click)="editTag(tag)">✏️</button>
            <button (click)="deleteTag(tag.id)" class="delete">🗑</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="edit-tag">
      <div *ngIf="selectedTag()">
        <h2>Modifier le tag</h2>
        <form [formGroup]="editTagForm" (ngSubmit)="updateTag()">
          <input formControlName="name" placeholder="Nom" />
          <input formControlName="color" type="color" />
          <div class="form-actions">
            <button type="button" (click)="cancelEdit()">Annuler</button>
            <button type="submit" [disabled]="editTagForm.invalid">Modifier</button>
          </div>
        </form>
      </div>
    </section>

  `,
  imports: [CommonModule, ReactiveFormsModule],
  styles: `
    @use '../config/mixins'

    .new-tag
      grid-area: new

    .list-tag
      grid-area: list

    .edit-tag
      grid-area: edit

    :host
      display: grid
      grid-template-areas: "list new" "list edit" "list ."
      gap: 30px

      @media(max-width: 570px)
        grid-template-areas: "new" "list" "edit"

    h2
      margin-top: 0

    form
      +mixins.wrapper(500px)
      gap: 10px

    input
      width: 100%
      margin: 5px 0
      padding: 10px

    button[type="submit"]
      +mixins.button(#C8E6C9)

    .form-actions
      +mixins.flex-row-right
      gap: 5px

      *
        width: 50%

    .tags
      +mixins.wrapper(500px)
      padding: 0
      list-style: none


    .tag
      --position: 0%
      +mixins.flex-row-between
      margin-bottom: 10px
      padding: 8px 10px
      background-color: #eee
      background-image: linear-gradient(to right, transparent var(--position), var(--tag-color) 85%, var(--tag-color) 100%)
      cursor: pointer
      transition: background 0.3s ease-in-out

      &:hover,
      &.active
        --position: 35%
        background-color: #fff

    .tag-infos
      flex: 1

    .tag-name
      margin-right: 5px
      font-weight: 700

    .color-tile
      display: inline-block
      width: 20px
      height: 20px
      margin-bottom: -5px
      margin-right: 10px
      background-color: var(--tag-color)

    .delete
      +mixins.button(#FFCCBC, true)
      border-radius: 20%

    input[type="color"]
      padding: 1px
      border: none
      margin: 5px 0 10px
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