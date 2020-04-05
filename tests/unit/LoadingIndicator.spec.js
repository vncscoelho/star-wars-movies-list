import { shallowMount } from "@vue/test-utils"
import LoadingIndicator from "@/components/LoadingIndicator.vue"

test("Loading Indicator matches the snapshot", () => {
  const wrapper = shallowMount(LoadingIndicator)
  expect(wrapper.element).toMatchSnapshot()
})
