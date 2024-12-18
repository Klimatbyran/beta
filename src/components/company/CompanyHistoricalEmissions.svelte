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
      scope1: period?.emissions?.scope1?.total || 0,
      scope2: period?.emissions?.scope2?.mb || 0,
      scope3: period?.emissions?.scope3?.statedTotalEmissions?.total || 0,
    }))
  }

  const emissionsData = extractEmissionsData(company.reportingPeriods)
  const years = emissionsData.map((item) => item.year)
  const scope1Data = emissionsData.map((item) => item.scope1)
  const scope2Data = emissionsData.map((item) => item.scope2)
  const scope3Data = emissionsData.map((item) => item.scope3)

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Scope 1',
        data: scope1Data,
        borderColor: '#AAE506',
        backgroundColor: '#AAE50699',
        borderWidth: 1,
        stack: 'stacked',
      },
      {
        label: 'Scope 2',
        data: scope2Data,
        borderColor: '#59A0E1',
        backgroundColor: '#59A0E199',
        borderWidth: 1,
        stack: 'stacked',
      },
      {
        label: 'Scope 3',
        data: scope3Data,
        borderColor: '#F0759A',
        backgroundColor: '#F0759A99',
        borderWidth: 1,
        stack: 'stacked',
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
                return `${formattedEmissions} ktCO₂`
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
            stacked: true,
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
