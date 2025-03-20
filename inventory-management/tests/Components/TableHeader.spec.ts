import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import TableHeader from '../../src/components/TableHeader.vue'

describe('TableHeader.vue', () => {
  it('renders the header text correctly', () => {
    const headerText = 'Test Header'
    const wrapper = mount(TableHeader, {
      props: { header: headerText }
    })
    expect(wrapper.text()).toBe(headerText)
  })

  it('applies the correct CSS classes', () => {
    const wrapper = mount(TableHeader, {
      props: { header: 'Test Header' }
    })
    const th = wrapper.find('th')
    expect(th.classes()).toContain('border-gray-200')
    expect(th.classes()).toContain('font-medium')
    expect(th.classes()).toContain('text-gray-600')
  })
})