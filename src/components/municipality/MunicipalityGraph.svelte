<script lang="ts">
  import type { Municipality } from '@/data/municipalityTypes'
  import { Chart, registerables } from 'chart.js'
  import { onMount } from 'svelte'

  export let municipality: Municipality

  Chart.register(...registerables)

  let lineChartElement: HTMLCanvasElement

  const extractEmissions = (data: { Year: number; CO2Equivalent: number }[]) =>
    data.map(({ Year, CO2Equivalent }) => ({
      year: Year,
      emission: CO2Equivalent,
    }))

  const combinedPastEmissions = [
    ...extractEmissions(municipality.HistoricalEmission.EmissionPerYear),
    ...extractEmissions(
      municipality.ApproximatedHistoricalEmission.EmissionPerYear,
    ),
  ]

  const trendEmissions = extractEmissions(
    municipality.EmissionTrend.TrendPerYear,
  )
  const budgetEmissions = extractEmissions(municipality.Budget.BudgetPerYear)

  const allYears = [
    ...new Set([
      ...combinedPastEmissions.map(({ year }) => year),
      ...trendEmissions.map(({ year }) => year),
    ]),
  ]

  const getEmissionsByYear = (
    data: { year: number; emission: number }[],
    year: number,
  ) => data.find((entry) => entry.year === year)?.emission || null

  const allData = [...combinedPastEmissions, ...trendEmissions]
  const rawMax = Math.max(...allData.map(({ emission }) => emission))
  const globalMax = Math.ceil(rawMax / 1000) * 1000

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: 'Historiskt',
        data: allYears.map((year) =>
          getEmissionsByYear(combinedPastEmissions, year),
        ),
        borderColor: 'rgba(244, 143, 42)',
        backgroundColor: 'rgba(244, 143, 42, 0.4)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Budget',
        data: allYears.map((year) => getEmissionsByYear(budgetEmissions, year)),
        borderColor: 'rgba(89, 160, 225)',
        backgroundColor: 'rgba(89, 160, 225, 0.7)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Trend',
        data: allYears.map((year) => getEmissionsByYear(trendEmissions, year)),
        borderColor: 'rgba(247, 60, 85)',
        backgroundColor: 'rgba(247, 60, 85, 0.4)',
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
      type: 'line',
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
            },
          },
          y: {
            min: 0,
            max: globalMax,
            title: { display: true, text: 'Tusen ton CO₂' },
            ticks: {
              callback: (value) => (Number(value) / 1000).toFixed(0),
            },
          },
        },
      },
    })

    lineChartElement.style.cursor = 'pointer'
  })
</script>

<main>
  <div class="relative h-[30vh] w-[85vw] max-w-[850px]">
    <canvas bind:this={lineChartElement}></canvas>
  </div>
</main>
