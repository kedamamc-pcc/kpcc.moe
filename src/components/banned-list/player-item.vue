<template lang="pug">
span(data-ref="wrap" class="relative" @mouseenter.self="isTooltipVisible = true" @mouseleave.self="isTooltipVisible = false")
  span(:class="{'border-b border-dashed border-gray-500': hasChangedName}") {{ lastName }}
  transition(
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-150 ease-in-out"
    leave-active-class="transition duration-150 ease-in-out"
  )
    span(
      v-if="hasChangedName"
      v-show="isTooltipVisible"
      data-ref="tooltip"
      class="absolute px-2 text-white bg-black bg-opacity-75 rounded"
    )
      span(class="text-gray-300") 当前:&nbsp;
      .
        {{ player.name }}
</template>

<script lang="ts">
  import {computed, defineComponent, PropType, ref} from 'vue'

  export default defineComponent({
    props: {
      player: {
        type: Object as PropType<PlayerInfo>,
        required: true,
      },
    },

    setup (props) {
      let lastName = computed(() => props.player.names.find(n => (n.changedToAt ?? 0) < props.player.time_last)!.name)
      let isTooltipVisible = ref(false)

      return {
        lastName,
        hasChangedName: computed(() => lastName.value !== props.player.name),
        isTooltipVisible,
      }
    },
  })
</script>

<style lang="scss" scoped>
  [data-ref=tooltip] {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 4px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: auto;
      width: 0;
      border-width: 4px 4px 0;
      border-style: solid;
      border-color: #000 transparent;
      opacity: 0.75;
    }
  }
</style>
