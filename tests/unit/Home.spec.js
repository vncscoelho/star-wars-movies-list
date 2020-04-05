import { createLocalVue, shallowMount } from "@vue/test-utils"
import Home from "@/views/Home.vue"
import api from "@/plugins/api"

const localVue = createLocalVue()

/* Load default plugins */
localVue.use(api, [
  { name: "swapi" },
  { name: "tmdb", apiKey: true }
])
localVue.use(require("vue-moment"))

/* Set wrapper */
const wrapper = shallowMount(Home, {
  localVue
})

/* Mocks data */
wrapper.setData({
  films: [{ title: "A New Hope", episode_id: 4, opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....", director: "George Lucas", producer: "Gary Kurtz, Rick McCallum", release_date: "1977-05-25" }],
  isLoaded: true
})

test("Home matches the snapshot", () => {
  expect(wrapper.element).toMatchSnapshot()
})

test("A title calls viewDetails when clicked", () => {
  const viewDetailsStub = jest.fn()
  wrapper.setMethods({ viewDetails: viewDetailsStub })
  wrapper.find("li.film").trigger("click")
  expect(viewDetailsStub).toHaveBeenCalled()
})
