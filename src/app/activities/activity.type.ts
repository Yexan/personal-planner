import { FormControl } from "@angular/forms"

export type Activity = {
  id: string
  name: string
  year: string
  month: string
  day: string
  tag: string
  price: number
  details?: string
}

export type ActivityWithoutId = Omit<Activity, 'id'>

export type ActivityFormControl = {
  [P in keyof ActivityWithoutId]: FormControl<ActivityWithoutId[P] | null>
}
