<script lang="ts">
  import type { EmissionPerYear, Municipality } from '@/data/municipalityTypes'
  import { Chart, registerables } from 'chart.js'
  import { onMount } from 'svelte'

  export let municipality: Municipality

  Chart.register(...registerables)

  const historicalEmissions =
    municipality.HistoricalEmission.EmissionPerYear.map((e) => ({
      year: e.Year,
      emission: e.CO2Equivalent,
    }))

  const approximatedEmissions =
    municipality.ApproximatedHistoricalEmission.EmissionPerYear.map((e) => ({
      year: e.Year,
      emission: e.CO2Equivalent,
    }))

  const combinedPastEmissions = [
    ...historicalEmissions.map((e) => ({
      year: e.year,
      emission: e.emission,
      source: 'historical',
    })),
    ...approximatedEmissions.map((e) => ({
      year: e.year,
      emission: e.emission,
      source: 'approximated',
    })),
  ]

  const trendEmissions = municipality.EmissionTrend.TrendPerYear.map((e) => ({
    year: e.Year,
    emission: e.CO2Equivalent,
  }))

  const budgetEmissions = municipality.Budget.BudgetPerYear.map((e) => ({
    year: e.Year,
    emission: e.CO2Equivalent,
  }))

  let lineChartElement: HTMLCanvasElement

  const allYears = [
    ...new Set([
      ...combinedPastEmissions.map(({ year }) => year),
      ...trendEmissions.map(({ year }) => year),
    ]),
  ]

  const getDataForYear = (data: any[], year: number) => {
    const record = data.find((item) => item.year === year)
    return record ? record.emission : null
  }

  const allData = [
    ...combinedPastEmissions,
    ...trendEmissions,
    ...budgetEmissions,
  ]
  const rawMax = Math.max(...allData.map(({ emission }) => emission))
  const globalMax = Math.ceil(rawMax / 1000) * 1000

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: 'Historiskt',
        data: allYears.map((year) =>
          getDataForYear(combinedPastEmissions, year),
        ),
        borderColor: 'rgba(244, 143, 42)',
        backgroundColor: 'rgba(244, 143, 42, 0.4)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Budget',
        data: allYears.map((year) => getDataForYear(budgetEmissions, year)),
        borderColor: 'rgba(89, 160, 225)',
        backgroundColor: 'rgba(89, 160, 225, 0.7)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Trend',
        data: allYears.map((year) => getDataForYear(trendEmissions, year)),
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
        responsive: true,
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
            title: {
              display: true,
              text: 'Tusen ton CO₂',
            },
            ticks: {
              callback: function (emissions) {
                const kiloTonEmissions = Number(emissions) / 1000
                return kiloTonEmissions
              },
            },
          },
        },
      },
    })

    lineChartElement.style.cursor = 'pointer'
  })
</script>

<main>
  <canvas bind:this={lineChartElement}></canvas>
</main>
