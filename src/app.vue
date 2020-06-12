<template lang="pug">
component(:is="layout")
  router-view
</template>

<script lang="ts">
  import {computed, defineComponent} from 'vue'

  import router from './router'
  import layouts from './layouts'

  export default defineComponent({
    setup () {
      return {
        layout: computed(() => layouts[router.currentRoute.value.matched.reverse().find(r => r.meta.layout)?.meta.layout ?? 'default']),
      }
    },
  })
</script>
