<script lang="ts">
  import { Chart, registerables } from 'chart.js'
  import { onMount } from 'svelte'

  Chart.register(...registerables)

  export let historicalEmissions = []
  export let approximatedEmissions = []
  export let trendEmissions = []
  export let budgetEmissions = []

  let lineChartElement: HTMLCanvasElement

  const allYears = [
    ...new Set([
      ...historicalEmissions.map(({ year }) => year),
      ...approximatedEmissions.map(({ year }) => year),
      ...trendEmissions.map(({ year }) => year),
      ...budgetEmissions.map(({ year }) => year),
    ]),
  ].sort((a, b) => a - b)

  const getDataForYear = (data, year) => {
    const record = data.find((item) => item.year === year)
    return record ? record.emission : null
  }

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: 'Historiskt',
        data: allYears.map((year) => getDataForYear(historicalEmissions, year)),
        borderColor: 'rgba(244, 143, 42)',
        backgroundColor: 'rgba(244, 143, 42, 0.4)',
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Approximerat',
        data: allYears.map((year) =>
          getDataForYear(approximatedEmissions, year),
        ),
        borderColor: 'rgba(244, 143, 42)',
        backgroundColor: 'rgba(244, 143, 42, 0.4)',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
      },
      {
        label: 'Budget',
        data: allYears.map((year) => getDataForYear(budgetEmissions, year)),
        borderColor: 'rgba(89, 160, 225)',
        backgroundColor: 'rgba(89, 160, 225, 0.5)',
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
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            min: Math.min(...allYears),
            max: Math.max(...allYears),
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tusen ton CO₂',
            },
            ticks: {
              callback: function (value) {
                return value / 1000
              },
            },
          },
        },
      },
    })
  })
</script>

<main>
  <canvas bind:this={lineChartElement}></canvas>
</main>
