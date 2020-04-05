import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@/views/Home"

Vue.use(VueRouter)

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/"
  },
  {
    name: "Film",
    component: () => import("../views/Film"),
    path: "/film/:episodeId",
    props: true
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
