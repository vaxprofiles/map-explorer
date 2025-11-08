<template>
  <div class="histogram-legend-container" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import {
  MapColor,
  createMapColor
} from '../map_color.ts'
import type { RegionData } from '../parse_data.ts'
import type { MapColorConfig } from '../types.ts'

interface Props {
  regionData: RegionData[] | undefined
  config: AppConfig
}

const props = withDefaults(defineProps<Props>(), {
  regionData: () => undefined,
})

const emit = defineEmits(['selected-legend-color'])

const containerRef = ref<HTMLElement | null>(null)
let svg: any = null


function formatThreshold(x) {
    if (x === 0) return "0";

  const abs = Math.abs(x);
  const sign = x < 0 ? "-" : "";

  // Scientific notation branch
  if (abs >= 1e3 || abs < 1e-3) {
    // Get "1.23e±n" with 3 significant digits
    const s = d3.format(".2e")(abs);          // e.g., "1.23e-5"
    const [mant, expStr] = s.split("e");      // mant="1.23", expStr="-5"
    const exp = parseInt(expStr, 10);

    return `${sign}${mant}e${exp >= 0 ? "+" : ""}${exp}`;
  }

  // Fixed/general with 3 significant digits
  // d3 ".3g" keeps 3 sig figs and uses fixed here; then drop leading zero.
  const fixed = d3.format(".3g")(x);
  return fixed.replace(/^(-?)0\./, "$1.");
}


function renderLegend() {
  if (!svg) return

  svg.selectAll('*').remove()

  const mapColor = createMapColor(props.config, props.regionData)

  const width = 300
  const height = 150
  const margin = { top: 40, right: 20, bottom: 40, left: 20 }

  const thresholds = mapColor.getThresholds()
  const colors = mapColor.getColors()
  const numBins = colors.length

  const binWidth = (width - margin.left - margin.right) / numBins
  const binHeight = 20

  const group = svg.append('g')

  // Title
  group.append('text')
    .attr('x', width / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    .attr('font-weight', 'bold')
    .text(props.config.legendTitle)

  // Color bins
  colors.forEach((color, i) => {
     group.append('rect')
    .attr('x', margin.left + i * binWidth)
    .attr('y', margin.top)
    .attr('width', binWidth)
    .attr('height', binHeight)
    .style('fill', color)
    .style('stroke', mapColor!.getBorderColor())
    .style('stroke-width', 0.5)
    .style('cursor', 'pointer')
    .style('touch-action', 'manipulation')

    .on('mouseenter', function () {
      d3.select(this).style('stroke-width', 2)
      emit('selected-legend-color', color)
    })
    .on('mouseout', function () {
      d3.select(this).style('stroke-width', 0.5)
      emit('selected-legend-color', "")
    })
  })

  // Threshold labels
  thresholds.forEach((threshold, i) => {
    const x = margin.left + i * binWidth

    // Tick marks
    group.append('line')
      .attr('x1', x)
      .attr('y1', margin.top + binHeight + 5)
      .attr('x2', x)
      .attr('y2', margin.top + binHeight + 10)
      .attr('stroke', '#888')

    // Threshold values
    group.append('text')
      .attr('x', x)
      .attr('y', margin.top + binHeight + 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .text(formatThreshold(threshold))
  })
}

const initialize = () => {
  switch (props.config.kind) {

    // dont render a legend with geojson-only
    case "geojson-only":
      return
      break

    case "geojson-datafile":
      break

    case "geojson-embedded":
      break

    default:
      break

  }

  if (!containerRef.value || !props.regionData.length) return

  svg = d3.select(containerRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '150px')
    .attr('viewBox', '0 0 300 150')

  renderLegend()
}

onMounted(initialize)

watch(
  [() => props.config, () => props.regionData, () => props.geojson],
  () => {
    renderLegend()
  },
  { deep: true }
)

</script>
