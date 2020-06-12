import {ComponentOptions, defineAsyncComponent} from 'vue'

export default {
  default: defineAsyncComponent(() => import('./default.vue')),
  fullpage: defineAsyncComponent(() => import('./fullpage.vue')),
} as {
  [layoutId: string]: ComponentOptions,
}
