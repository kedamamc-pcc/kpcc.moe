import {ref} from 'vue'

export let nav = ref([
  ...process.env.NODE_ENV !== 'development' ? [] : [{
    path: '/players-chart',
    label: '玩家时间统计',
  }],
  {
    path: '/banned-list',
    label: 'BANNED LIST',
  },
])
