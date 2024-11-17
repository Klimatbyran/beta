<script>
  import * as d3 from "d3"

  export let historicalEmissions
  export let approximatedEmissions
  export let trendEmissions
  export let budgetEmissions

  export let width = 928
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
  style:max-width="100%"
  style:height="auto"
>
  <g transform="translate(0,{height - marginBottom})">
    <line stroke="currentColor" x1={marginLeft - 6} x2={width} />

    {#each xScale.ticks() as tick}
      <text fill="currentColor" text-anchor="middle" x={xScale(tick)} y={22}>
        {tick.getFullYear()}
      </text>
    {/each}
  </g>

  <g transform="translate({marginLeft},0)">
    {#each yScale.ticks() as tick}
      <text
        fill="currentColor"
        text-anchor="end"
        dominant-baseline="middle"
        x={-9}
        y={yScale(tick)}
      >
        {tick}
      </text>
    {/each}

    <text fill="currentColor" text-anchor="start" x={-marginLeft} y={12}>
      Tusen ton CO₂
    </text>
  </g>

  <path fill="none" stroke="orange" stroke-width="2" d={line(historicalEmissions)} />
  <path fill="none" stroke="orange" stroke-dasharray="4,4" stroke-width="2" d={line(approximatedEmissions)} />
  <path fill="none" stroke="red" stroke-width="2" d={line(trendEmissions)} />
  <path fill="none" stroke="steelblue" stroke-width="2" d={line(budgetEmissions)} />
</svg>