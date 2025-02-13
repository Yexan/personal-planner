import { Component, Input, OnChanges } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { TagStat } from './tag.type'

Chart.register(...registerables)

@Component({
  standalone: true,
  selector: 'app-tag-chart',
  template: `
    <div class="chart-container">
      <canvas id="chartCanvas"></canvas>
    </div>
  `,
  styles: `
    @use '../styles/mixins'

    .chart-container
      +mixins.flex-column-center
      +mixins.wrapper(400px)
      +mixins.glass-surface-card
  `
})
export class TagChartComponent implements OnChanges {
  @Input() data: TagStat[] = []
  @Input() title: string = 'Répartition des activités'

  chart: Chart | undefined

  ngOnChanges(): void {
    this.renderChart()
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy()
    }

    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.data.map(d => d.tagName),
        datasets: [
          {
            data: this.data.map(d => d.amount),
            backgroundColor: this.data.map(d => d.color),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#000',
              font: {
                size: 16,
              }
            },
          },
          title: {
            display: true,
            text: this.title,
            color: '#000',
            font: {
              size: 16,
            }
          },
        },
      },
    })
  }
}