import {createApp} from 'vue'

import './assets/css/base.scss'
import App from './app.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
