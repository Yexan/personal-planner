import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-debug',
  template: `
    <div></div>
  `
})
export class DebugComponent {
  constructor() {
    console.log('Initialize debug component')
  }
}