<template lang="pug">
div(class="relative min-h-screen flex flex-col")
  header(class="flex-none self-center py-4")
    nav(class="text-gray-500 flex items-center space-x-4")
      router-link(v-for="it of nav" :key="it.path" :to="it.path" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") {{ it.label }}
  main(class="flex-1 flex flex-col")
    slot
  footer(class="flex-none self-center mt-auto py-4")
    nav(class="text-gray-500 flex items-center space-x-4")
      a(href="https://bbs.craft.moe/d/152" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") 关于我们
      a(href="mailto:hello@kpcc.moe" class="pb-1 hover:text-black border-b border-gray-300 hover:border-black") hello@kpcc.moe
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import {nav} from '../store'

  export default defineComponent({
    setup () {
      return {
        nav,
      }
    },
  })
</script>
