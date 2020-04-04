import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import api from "./plugins/api"
import "./assets/styles/index.css"

Vue.config.productionTip = false

/* Axios API plugin */
Vue.use(api, [
  { name: "swapi" },
  { name: "tmdb", apiKey: true }
])

/* Moment.js */
Vue.use(require("vue-moment"))

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
