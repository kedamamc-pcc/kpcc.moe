<template lang="pug">
header(class="flex-none h-20 pl-20 pr-6 flex items-center")
  h1(class="text-lg font-black") 玩家时间
div(ref="chart" data-ref="chart" class="flex-1")
//div.
</template>

<script lang="ts">
  import {defineComponent, ref, watch} from 'vue'
  import * as d3 from 'd3'

  const HALF_YEAR = 1000 * 60 * 60 * 24 * 183

  export default defineComponent({
    setup () {
      let chart = ref(null as HTMLDivElement | null)
      let data = ref(null as PlayersJson | null)

      fetch('/players.json').then<PlayersJson>(res => res.json()).then(_data => data.value = _data)

      watch<[typeof chart, typeof data]>([chart, data], ([chart, data]) => {
        if (!chart || !data) return

        const axisLineColor = '#555'
        // @ts-ignore
        void false && echarts.init(chart).setOption({
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataZoom: {show: true},
              saveAsImage: {show: true},
            },
          },
          title: {
            text: '毛线玩家入服时间分布',
            textStyle: {
              color: '#888',
            },
            subtext: '红色表示近半年登录过的玩家／数据新鲜度: ' + formatDate(new Date(data._update)),
            subtextStyle: {
              color: '#666',
            },
            left: 'center',
            top: 10,
          },
          grid: {
            left: 60,
            top: 70,
            right: 60,
            bottom: 60,
          },
          xAxis: {
            name: '入服\n时间',
            type: 'time',
            axisLine: {
              lineStyle: {
                color: axisLineColor,
              },
            },
          },
          yAxis: {
            name: '在线\n时长',
            type: 'log',
            axisLine: {
              lineStyle: {
                color: axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#3c3c3c',
              },
            },
            logBase: 8,
            axisLabel: {
              formatter: formatTime,
            },
            axisPointer: {
              label: {
                formatter: ({value}: {value: number}) => formatTime(value),
              },
            },
          },
          axisPointer: {
            show: true,
            snap: true,
            triggerTooltip: false,
          },
          series: [{
            type: 'scatter',
            data: data.players.map(p => [p.time_start, p.time_lived / 60]),
            symbolSize: 4,
            itemStyle: {
              normal: {
                color (obj: {dataIndex: number}) {
                  let p = data.players[obj.dataIndex]
                  if (p.banned) {
                    return '#000'
                  } else {
                    return Date.now() - p.time_last <= HALF_YEAR ? '#f33' : '#777'
                  }
                },
              },
            },
            tooltip: {
              // @ts-ignore
              formatter (params) {
                // @ts-ignore
                let p = data.players[params.dataIndex]
                return p.name + (p.banned ? '<span class="banned">BANNED</span>' : '') + '<br>入服时间: ' + formatDate(new Date(p.time_start)) + '<br>在线时长: ' + formatTime(p.time_lived / 60)
              },
            },
          }],
          tooltip: {
            trigger: 'item',
          },
        })
      })

      watch<[typeof chart, typeof data]>([chart, data], ([chart, data]) => {
        if (!chart || !data) return
        // @ts-ignore
        window.players = data.players
        renderChart(chart, data)
      })

      return {
        chart,
        data,
      }
    },
  })

  function renderChart (container: HTMLElement, {players}: PlayersJson) {
    const width = 1000 //container.offsetWidth
    const height = 1000 //container.offsetHeight
    const margin = {top: 20, right: 20, bottom: 20, left: 40}

    const xVal = (p: PlayerInfo) => new Date(p.time_start)
    const yVal = (p: PlayerInfo) => p.time_lived

    const x = d3.scaleTime()
      .domain(d3.extent(players, xVal) as [Date, Date])
      .rangeRound([margin.left, width - margin.right])
    const y = d3.scaleLog()
      .domain(d3.extent(players, yVal) as [number, number])
      .rangeRound([height - margin.bottom, margin.top])

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          // .tickFormat(time_start => {
          //   const d = new Date(time_start as number)
          //   return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0')
          // })
      )

    const ONE_DAY_IN_SECS = 24 * 3600
    const yTickValues = [
      60,
      3600,
      ONE_DAY_IN_SECS,
      ONE_DAY_IN_SECS * 7,
      ONE_DAY_IN_SECS * 30,
      ONE_DAY_IN_SECS * 90,
      ONE_DAY_IN_SECS * 180,
      ONE_DAY_IN_SECS * 360,
      ONE_DAY_IN_SECS * (360 << 1),
      ONE_DAY_IN_SECS * (360 << 2),
    ]

    // Y-axis (left)
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        d3.axisLeft(y)
          .tickValues(yTickValues)
          .tickFormat(formatTime))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.tick text').attr('x', -4))

    // Y-axis (right)
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        d3.axisRight(y)
          .tickValues(yTickValues)
          .tickSize(width - margin.left - margin.right))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick text').remove())
      .classed('separator', true)

    // Points
    svg.selectAll('rect')
      .data(players)
      .enter()
      .append('rect')
      .attr('x', p => x(xVal(p)))
      .attr('y', p => y(yVal(p)))
      .classed('point', true)
      .classed('banned', p => p.banned)
      .on('click', (p) => console.log({...p}))
  }

  function renderChart2 (container: HTMLElement, {players}: PlayersJson) {
    const width = 1000
    const height = 1000
    const margin = {top: 20, right: 20, bottom: 20, left: 40}
    const now = Date.now()

    const xVal = (p: PlayerInfo) => new Date(p.time_start)
    const yVal = (p: PlayerInfo) => p.time_lived * 1000 / (now - p.time_start)

    const x = d3.scaleTime()
      .domain(d3.extent(players, xVal) as [Date, Date])
      .rangeRound([margin.left, width - margin.right])
    const y = d3.scaleLinear()
      .domain(d3.extent(players, yVal) as [number, number])
      .rangeRound([height - margin.bottom, margin.top])

    const svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          // .tickFormat(ts => {
          //   const d = new Date(ts as number)
          //   return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0')
          // })
      )

    const yTickValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        d3.axisLeft(y)
          .tickValues(yTickValues)
          .tickFormat(val => (val as number) * 100 + '%')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.tick text').attr('x', -4))

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        d3.axisRight(y)
          .tickValues(yTickValues)
          .tickSize(width - margin.left - margin.right)
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick text').remove())
      .classed('separator', true)

    svg.selectAll('rect')
      .data(players)
      .enter()
      .append('rect')
      .attr('x', p => x(xVal(p)))
      .attr('y', p => y(yVal(p)))
      .classed('point', true)
      .classed('banned', p => p.banned)
      .on('click', p => console.log({...p}))
  }

  function formatTime (value: number | {valueOf: () => number}) {
    const val = typeof value === 'number' ? value : value.valueOf()

    const SCALES: [number, string][] = [
      [3600 * 24, 'd'],
      [3600, 'h'],
      [60, 'm'],
    ]
    const scale = SCALES.find(([scale]) => val >= scale) ?? [0, 's']
    return `${Math.round(val / scale[0])} ${scale[1]}`
  }

  function formatDate (date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 101 + '').slice(1)}-${(date.getDate() + 100 + '').slice(1)} ${(date.getHours() + 100 + '').slice(1)}:${(date.getMinutes() + 100 + '').slice(1)}:${(date.getSeconds() + 100 + '').slice(1)}`
  }
</script>

<style lang="scss" scoped>
  [data-ref=chart] {
    ::v-deep {
      svg {
        @apply mx-auto;
        outline: 1px solid #f0f;
      }

      .separator {
        stroke-opacity: 0.5;
        stroke-dasharray: 2,2;
      }

      .point {
        width: 4px;
        height: 4px;
        transform: translate(-2px, -2px);
        fill: #abc;

        &.banned {
          fill: #f30;
        }
      }
    }
  }

  .banned {
    margin-left: 10px;
    background: #fff;
    color: #333;
    padding: 0 3px;
    border-radius: 3px;
    line-height: 1;
  }
</style>
