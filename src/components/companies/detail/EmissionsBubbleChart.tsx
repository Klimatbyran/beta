import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Text } from '@/components/ui/text'
import { cn, formatEmissions } from '@/lib/utils'
import { getCategoryName, getCategoryColor } from '@/lib/constants/emissions'
import type { Emissions } from '@/types/company'

interface EmissionsBubbleChartProps {
  emissions: Emissions
  className?: string
}

interface BubbleNode {
  id: string
  value: number
  color: string
  label: string
  category?: number
}

export function EmissionsBubbleChart({
  emissions,
  className,
}: EmissionsBubbleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !emissions) return

    // Prepare data
    const nodes: BubbleNode[] = []

    // Add Scope 1
    if (emissions.scope1?.total) {
      nodes.push({
        id: 'scope1',
        value: emissions.scope1.total,
        color: 'var(--orange-3)',
        label: `Scope 1\n${formatEmissions(emissions.scope1.total)}`,
      })
    }

    // Add Scope 2
    if (emissions.scope2?.calculatedTotalEmissions) {
      nodes.push({
        id: 'scope2',
        value: emissions.scope2.calculatedTotalEmissions,
        color: 'var(--pink-3)',
        label: `Scope 2\n${formatEmissions(
          emissions.scope2.calculatedTotalEmissions
        )}`,
      })
    }

    // Add Scope 3 categories
    emissions.scope3?.categories?.forEach((cat) => {
      nodes.push({
        id: `cat${cat.category}`,
        value: cat.total,
        color: getCategoryColor(cat.category),
        label: `${formatEmissions(cat.total)}`,
        category: cat.category,
      })
    })

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    // Set up the SVG
    const width = svgRef.current.clientWidth
    const height = 600
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Calculate logarithmic scale for bubble sizes
    const valueExtent = d3.extent(nodes, (d) => d.value) as [number, number]
    const sizeScale = d3.scaleLinear().domain(valueExtent).range([40, 200]) // Min and max bubble radius

    // Create the simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius((d) => sizeScale(d.value) + 2) // Minimal padding
      )
      .on('tick', ticked)

    // Create the node elements
    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node')

    // Add circles
    node
      .append('circle')
      .attr('r', (d) => sizeScale(d.value))
      .style('fill', (d) => d.color)
      .style('fill-opacity', 0.7)
      .style('stroke', (d) => d.color)
      .style('stroke-width', 0)

    // Add labels
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '30px')
      .selectAll('tspan')
      .data((d) => d.label.split('\n'))
      .join('tspan')
      .attr('x', 0)
      .attr('y', (_, i) => `${i * 1.1}em`)
      .text((d) => d)

    function ticked() {
      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    }

    return () => {
      simulation.stop()
    }
  }, [emissions])

  return (
    <div className={cn('bg-black-2 rounded-level-1 p-16', className)}>
      <Text variant="h3" className="mb-12">
        Utsläpp per kategori
      </Text>
      <svg ref={svgRef} className="w-full" style={{ minHeight: '600px' }} />
    </div>
  )
}
