<script>
  import * as d3 from "d3"

  export let historicalEmissions
  export let approximatedEmissions
  export let trendEmissions
  export let budgetEmissions

  export let width = 1000
  export let height = 500
  export let marginTop = 20
  export let marginRight = 30
  export let marginBottom = 30
  export let marginLeft = 40

  const xScale = d3.scaleUtc(
    d3.extent(
      [
        ...historicalEmissions,
        ...approximatedEmissions,
        ...trendEmissions,
        ...budgetEmissions,
      ].map((d) => new Date(d.year, 0, 1))
    ),
    [marginLeft, width - marginRight]
  )

  const yScale = d3.scaleLinear(
    [0, d3.max(historicalEmissions, (d) => d.emission/1000)],
    [height - marginBottom, marginTop]
  )

  const line = d3
    .line()
    .x((d) => xScale(new Date(d.year, 0, 1)))
    .y((d) => yScale(d.emission/1000))
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  class="w-full h-auto"
>
  <g transform="translate(0,{height - marginBottom})">
    <line class="stroke-current" x1={marginLeft - 6} x2={width} />

    {#each [...xScale.ticks(d3.utcYear.every(10)), new Date(2050, 0, 1)] as tick (tick)}
      <text class="text-2xl md:text-sm fill-white" text-anchor="middle" x={xScale(tick)} y={22}>
        {tick.getFullYear()}
      </text>
    {/each}
  </g>

  <g transform="translate({marginLeft},0)">
    {#each yScale.ticks() as tick}
      <text
        class="text-2xl md:text-sm fill-white"
        text-anchor="end"
        dominant-baseline="middle"
        x={-8}
        y={yScale(tick)}
      >
        {tick}
      </text>
    {/each}

    <text class="text-3xl md:text-lg font-semibold fill-white" text-anchor="start" x={-marginLeft} y={14}>
      Tusen ton CO₂
    </text>
  </g>

  <path
    class="stroke-orange-500"
    fill="none"
    stroke-width="3"
    d={line(historicalEmissions)}
  />
  <path
    class="stroke-orange-500"
    stroke-dasharray="4,4"
    fill="none"
    stroke-width="3"
    d={line(approximatedEmissions)}
  />
  <path
    class="stroke-red-500"
    fill="none"
    stroke-width="3"
    d={line(trendEmissions)}
  />
  <path
    class="stroke-blue-500"
    fill="none"
    stroke-width="3"
    d={line(budgetEmissions)}
  />
</svg>
