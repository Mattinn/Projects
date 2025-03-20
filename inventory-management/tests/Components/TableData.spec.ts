import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import TableData from '../../src/components/TableData.vue'

describe('TableData.vue', () => {
  it('renders the data text correctly', () => {
    const dataText = 'This is Bananas'
    const wrapper = mount(TableData, {
      props: { data: dataText }
    })
    const td = wrapper.find('td')
    expect(td.text()).toBe(dataText)
  })

  it('applies the correct CSS classes', () => {
    const wrapper = mount(TableData, {
      props: { data: 'Very Important Data' }
    })
    const td = wrapper.find('td')
    expect(td.classes()).toContain('p-4')
    expect(td.classes()).toContain('text-gray-500')
  })
})