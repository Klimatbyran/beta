<script lang="ts">
  import type { CompanyData, ReportingPeriod } from '@/data/companyData'
  import { Chart, registerables } from 'chart.js'
  import { onMount } from 'svelte'
  import Card from '../ui/card/card.svelte'

  export let company: CompanyData

  Chart.register(...registerables)

  let lineChartElement: HTMLCanvasElement

  const extractEmissionsData = (reportingPeriods: ReportingPeriod[]) => {
    return reportingPeriods.map((period) => ({
      year: new Date(period.startDate).getFullYear(),
      emission: period?.emissions?.statedTotalEmissions?.total || 0,
    }))
  }

  const emissionsData = extractEmissionsData(company.reportingPeriods)
  const years = emissionsData.map((item) => item.year)
  const emissions = emissionsData.map((item) => item.emission)

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Totala utsläpp',
        data: emissions,
        borderColor: 'rgba(244, 143, 42)',
        backgroundColor: 'rgba(244, 143, 42, 0.4)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
    ],
  }

  onMount(() => {
    if (!lineChartElement) {
      console.error('Canvas element not bound correctly')
      return
    }

    new Chart(lineChartElement, {
      type: 'bar',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            callbacks: {
              title: () => '',
              label: function (tooltipData) {
                const emissions =
                  tooltipData.dataset.data[tooltipData.dataIndex]
                const formattedEmissions = (Number(emissions) / 1000).toFixed(0)
                return `${formattedEmissions}`
              },
            },
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'År',
            },
            ticks: {
              callback: function (value) {
                return value
              },
              stepSize: 1,
            },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Tusen ton CO₂' },
            ticks: {
              callback: (value) => (Number(value) / 1000).toFixed(0),
            },
          },
        },
      },
    })
  })
</script>

<Card class="grid gap-8" level={1}>
  <h2 class="pt-4 text-3xl leading-none tracking-tight md:pt-0">
    Historiska utsläpp
  </h2>
  <div class="relative h-[30vh] w-[85vw] max-w-[850px]">
    <canvas bind:this={lineChartElement}></canvas>
  </div>
</Card>
