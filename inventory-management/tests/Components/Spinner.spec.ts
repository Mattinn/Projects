import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Spinner from '../../src/components/Spinner.vue'

describe('Spinner.vue', () => {
  it('renders the spinner image', () => {
    const wrapper = mount(Spinner)
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Fetching...')
  })

  it('applies the correct CSS classes for spinning animation', () => {
    const wrapper = mount(Spinner)
    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-12')
    expect(img.classes()).toContain('h-12')
    expect(img.classes()).toContain('animate-spin')
  })
})