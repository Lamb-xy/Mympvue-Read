import Vue from 'vue'
import App from './App'
<<<<<<< HEAD

=======
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
>>>>>>> 3565444 (项目大致完成版)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
