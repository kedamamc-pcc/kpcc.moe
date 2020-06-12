<template lang="pug">
header(class="flex-none h-20 px-20 flex items-center justify-center")
  hgroup(class="text-center")
    h1(class="text-2xl font-black") BANNED LIST
    h2(class="text-sm text-gray-500") 数据新鲜度：{{ new Date(1591791543970).toLocaleString() }}
p(class="py-5 text-gray-600 text-center") {{ list.length ? `总数：${list.length}` : 'LOADING...' }}
ul(class="mx-auto leading-loose text-center whitespace-no-wrap grid grid-cols-4 col-gap-4")
  li(v-for="p of list" :key="p.uuid") {{ p.name }}
footer(v-show="list.length" class="py-5 text-center")
  p(class="text-gray-400") 尊重他人，尊重自己
  p(class="text-5xl") 💐
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from 'vue'

  export default defineComponent({
    setup () {
      let playersJson = ref<PlayersJson | null>(null)

      fetch('/players.json').then<PlayersJson>(async res => playersJson.value = await res.json())

      return {
        list: computed(
          () => playersJson.value?.players
            .filter(p => p.banned)
            .sort((a, b) => a.name < b.name ? -1 : 1)
            ?? []
        ),
      }
    },
  })
</script>
