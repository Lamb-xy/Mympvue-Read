import Vue from 'vue'
import App from './index'

// add this to handle exception
<<<<<<< HEAD
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}
=======
// Vue.config.errorHandler = function (err) {
//   if (console && console.error) {
//     console.error(err)
//   }
// }
>>>>>>> 3565444 (项目大致完成版)

const app = new Vue(App)
app.$mount()
