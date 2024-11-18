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
    return record ? record.emission : null // Return null if the year is not present
  }

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: 'Historical Emissions',
        data: allYears.map((year) => getDataForYear(historicalEmissions, year)),
        borderColor: 'hsl(43 100% 52%)',
        backgroundColor: 'hsl(43 100% 52% / 40%)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Approximated Emissions',
        data: allYears.map((year) =>
          getDataForYear(approximatedEmissions, year),
        ),
        borderColor: 'hsl(220 100% 50%)',
        backgroundColor: 'hsl(220 100% 50% / 40%)',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Trend Emissions',
        data: allYears.map((year) => getDataForYear(trendEmissions, year)),
        borderColor: 'hsl(10 80% 50%)',
        backgroundColor: 'hsl(10 80% 50% / 40%)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Budget Emissions',
        data: allYears.map((year) => getDataForYear(budgetEmissions, year)),
        borderColor: 'hsl(120 50% 50%)',
        backgroundColor: 'hsl(120 50% 50% / 40%)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
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
          },
        },
      },
    })
  })
</script>

<main>
  <canvas bind:this={lineChartElement}></canvas>
</main>
