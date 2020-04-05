import { shallowMount } from "@vue/test-utils"
import Film from "@/views/Film.vue"

test("Film loads correctly", () => {
  const wrapper = shallowMount(Film, {
    props: {
      episodeId: 1
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})
