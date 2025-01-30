import { Injectable, inject } from '@angular/core'

import { collection, doc, addDoc, updateDoc, deleteDoc, Firestore, query, collectionData } from '@angular/fire/firestore'

import { Activity, ActivityWithoutId } from './activity.type'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  firestore = inject(Firestore)
  activitiesCollection = collection(this.firestore, 'activities')

  async addActivity(activity: ActivityWithoutId) {
    return await addDoc(this.activitiesCollection, activity);
  }

  getActivities(): Observable<Activity[]> {
    return collectionData(this.activitiesCollection, { idField: 'id' }) as Observable<Activity[]>;
  }

  async updateActivity(activityId: string, updatedData: ActivityWithoutId) {
    const activityDoc = doc(this.firestore, `activities/${activityId}`);
    return await updateDoc(activityDoc, updatedData);
  }

  async deleteActivity(activityId: string) {
    const activityDoc = doc(this.firestore, `activities/${activityId}`);
    return await deleteDoc(activityDoc);
  }
}
