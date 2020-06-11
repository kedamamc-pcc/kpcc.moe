<template lang="pug">
div.relative.min-h-screen.flex.flex-col
  header.flex-none.self-center.py-4
    nav.text-gray-500.flex.items-center.space-x-4
      a(href="/player-join-chart" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") 玩家入服时间分布
  main.flex-none.self-center.my-auto
    - let width = 300
    hgroup(style={width: width + 'px'})
      h1
        svg(viewBox="0 0 26 5")
          path(id="letter-k" d="M0 0L2 0L2 2L3 2L3 1L4 1L4 0L5 0L5 1L4 1L4 2L3 2L3 3L4 3L4 4L5 4L5 5L4 5L4 4L3 4L3 3L2 3L2 5L0 5L0 4L1 4L1 1L0 1Z")
          path(id="letter-p" d="M7 0L11 0L11 1L12 1L12 2L11 2L11 1L9 1L9 2L11 2L11 3L9 3L9 4L10 4L10 5L7 5L7 4L8 4L8 1L7 1Z")
          path(id="letter-c1" d="M14 1L15 1L15 0L18 0L18 1L19 1L19 2L18 2L18 1L16 1L16 4L18 4L18 3L19 3L19 4L18 4L18 5L15 5L15 4L14 4Z")
          path(id="letter-c1" d="M21 1L22 1L22 0L25 0L25 1L26 1L26 2L25 2L25 1L23 1L23 4L25 4L25 3L26 3L26 4L25 4L25 5L22 5L22 4L21 4L21 1Z")
      h2(class="mt-3 font-bold" style={fontSize: `calc(${width}px / 9)`}) 毛线玩家建设委员会
    ul(class="mt-5 text-center space-y-4")
      li(v-for="mb of members" :key="mb[0]") {{ mb[0] }}
  footer.flex-none.self-center.py-4
    nav.text-gray-500.flex.items-center.space-x-4
      a(href="https://bbs.craft.moe/d/152" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") 关于我们
      a(href="mailto:hello@kpcc moe" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") hello@kpcc.moe
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'App',

    setup () {
      return {
        members: [
          ['Adamoon_yumo'],
          ['Ankou54', '兔纸'],
          ['Aqua_BYH', '虚无'],
          ['Aqua_Cc', 'Cc'],
          ['Aqua_nano', '李德二'],
          ['Aqua_Rem', '兽兽'],
          ['DSGE'],
          ['Fail_Sakura'],
          ['JieXia'],
          ['lkczy'],
          ['SilentDepth', '帝企鹅'],
        ],
      }
    },
  })
</script>
