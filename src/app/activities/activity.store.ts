import { Injectable, Signal, signal, computed, effect, inject } from '@angular/core'

import { Activity, ActivityWithoutId } from './activity.type'
import { ActivityService } from './activity.service'
import { TagService } from '../tags/tag.service'
import { TagStat } from '../tags/tag.type'

@Injectable({
  providedIn: 'root',
})
export class ActivityStore {
  private activityService = inject(ActivityService)
  private tagService = inject(TagService)
  private activities = signal<Activity[]>([])

  // Effet to sync with Firebase
  constructor() {
    effect(() => {
      this.activityService.getActivities().subscribe((data) => {
        this.activities.set(data)
      })
    })
  }

  activitiesSignal(): Signal<Activity[]> {
    return this.activities.asReadonly()
  }

  activitiesByYearAndMonth = computed(() => {
    const grouped: Record<string, Record<string, Activity[]>> = {}

    for (const activity of this.activities()) {
      if (!grouped[activity.year]) {
        grouped[activity.year] = {}
      }
      if (!grouped[activity.year][activity.month]) {
        grouped[activity.year][activity.month] = []
      }
      grouped[activity.year][activity.month].push(activity)
    }
    for (const year of Object.keys(grouped)) {
      for (const month of Object.keys(grouped[year])) {
        grouped[year][month].sort((a, b) => Number(a.day) - Number(b.day))
      }
    }
    return grouped
  })

  years = computed(
    () => Object.keys(this.activitiesByYearAndMonth()).sort((a, b) => Number(b) - Number(a))
  )

  monthsByYear = computed(() => {
    const result: Record<string, string[]> = {}
    for (const year of this.years()) {
      result[year] = Object.keys(this.activitiesByYearAndMonth()[year] || {}).sort((a, b) => Number(a) - Number(b))
    }
    return result
  })

  activitiesCountByMonth = computed(() => {
    const result: Record<string, Record<string, number>> = {}
    for (const year of this.years()) {
      result[year] = {}
      for (const month of this.monthsByYear()[year]) {
        result[year][month] = this.activitiesByYearAndMonth()[year][month]?.length || 0
      }
    }
    return result
  })

  getActivity = (activityId: Activity['id']) => {
    return this.activities().find(activity => activity.id === activityId)
  }


  async addActivity(activity: ActivityWithoutId) {
    await this.activityService.addActivity(activity)
  }

  async updateActivity(id: string, updatedData: ActivityWithoutId) {
    await this.activityService.updateActivity(id, updatedData)
  }

  async deleteActivity(id: string) {
    await this.activityService.deleteActivity(id)
  }


  allTagsStats = computed(() => this.getTagStats(this.activities()))

  tagsStatsByYear = (year: string) => computed(() =>
    this.getTagStats(this.activities().filter(a => a.year === year))
  )

  tagsStatsByMonth = (year: string, month: string) => computed(() =>
    this.getTagStats(this.activities().filter(a => a.year === year && a.month === month))
  )

  private getTagStats(activities: Activity[]): TagStat[] {
    const stats: Record<string, number> = {}
    activities.forEach(({ tag }) => {
      stats[tag] = (stats[tag] || 0) + 1
    })
    return Object.entries(stats).map(
      ([tag, count]) => ({
        tagName: tag,
        amount: count,
        color: this.tagService.getTagColor(tag)
      })
    )
  }
}