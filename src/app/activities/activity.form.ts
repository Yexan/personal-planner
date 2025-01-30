import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivityWithoutId, ActivityFormControl } from './activity.type'


export function createActivityForm(fb: FormBuilder, activity?: Partial<ActivityWithoutId>): FormGroup {
  return fb.group<ActivityFormControl>({
    name: new FormControl(activity?.name || '', Validators.required),
    year: new FormControl(activity?.year || `${new Date().getFullYear()}`, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]),
    month: new FormControl(activity?.month || `${new Date().getMonth() + 1001}`.slice(2), [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]),
    day: new FormControl(activity?.day || `${new Date().getDate()}`, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2)
    ]),
    tag: new FormControl(activity?.tag || 'Sport', Validators.required),
    price: new FormControl(activity?.price || 0, [
      Validators.required,
    ]),
    details: new FormControl(activity?.details || '')
  })
}
