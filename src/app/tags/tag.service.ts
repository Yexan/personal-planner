import { Injectable, Signal, WritableSignal, signal, computed, effect, inject } from '@angular/core'
import { collection, doc, addDoc, updateDoc, deleteDoc, Firestore, collectionData } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

import { Tag, TagWithoutId } from './tag.type'

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private firestore = inject(Firestore)
  private tagsCollection = collection(this.firestore, 'tags')

  private _tags: WritableSignal<Tag[]> = signal([])

  constructor() {
    this.loadTags()
  }

  get tags(): Signal<Tag[]> {
    return this._tags
  }

  private loadTags() {
    const tags$ = collectionData(this.tagsCollection, { idField: 'id' }) as Observable<Tag[]>
    effect(() => {
      tags$.subscribe((tags) => this._tags.set(tags))
    })
  }

  async addTag(tag: Omit<Tag, 'id'>) {
    await addDoc(this.tagsCollection, tag)
  }

  async updateTag(tagId: string, updatedData: TagWithoutId) {
    const tagDoc = doc(this.firestore, `tags/${tagId}`)
    await updateDoc(tagDoc, updatedData)
  }

  async deleteTag(tagId: string) {
    const tagDoc = doc(this.firestore, `tags/${tagId}`)
    await deleteDoc(tagDoc)
  }

  getTagById(tagId: string): Signal<Tag | undefined> {
    return computed(() => this._tags().find((tag) => tag.id === tagId))
  }

  getTagColor(tagName: string) {
    const tag = this.tags().find((tag) => tag.name === tagName)
    return tag && tag.color || '#000'
  }
}