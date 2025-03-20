import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Table from '../../src/components/Table.vue'
import Spinner from '../../src/components/Spinner.vue'
import TableHeader from '../../src/components/TableHeader.vue'
import TableData from '../../src/components/TableData.vue'

describe('Table.vue', () => {
  const items = [
    { id: 1, name: 'Apple', quantity: 10, sku: 'APP1', description: 'Crisp and juicy apple', price: 100 },
    { id: 2, name: 'Orange', quantity: 20, sku: 'OR2', description: 'Citrusy and tangy orange', price: 200 },
  ]

  it('renders table headers correctly', () => {
    const wrapper = mount(Table, {
      props: { loading: false, data: items },
      global: {
        components: { TableHeader, TableData, Spinner }
      }
    })
    const headers = wrapper.findAllComponents(TableHeader)
    expect(headers).toHaveLength(6)
    expect(headers[0].text()).toBe('ID')
    expect(headers[1].text()).toBe('Name')
    expect(headers[2].text()).toBe('Quantity')
    expect(headers[3].text()).toBe('SKU')
    expect(headers[4].text()).toBe('Description')
    expect(headers[5].text()).toBe('Price')
  })

  it('renders loading spinner when loading is true', () => {
    const wrapper = mount(Table, {
      props: { loading: true, data: [] },
      global: {
        components: { TableHeader, TableData, Spinner }
      }
    })
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('renders table rows correctly when loading is false', () => {
    const wrapper = mount(Table, {
      props: { loading: false, data: items },
      global: {
        components: { TableHeader, TableData, Spinner }
      }
    })
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(items.length)
    expect(rows[0].text()).toContain('Apple')
    expect(rows[1].text()).toContain('Orange')
  })

  it('emits itemSelected event when a row is clicked', async () => {
    const wrapper = mount(Table, {
      props: { loading: false, data: items },
      global: {
        components: { TableHeader, TableData, Spinner }
      }
    })
    const rows = wrapper.findAll('tbody tr')
    await rows[0].trigger('click')
    expect(wrapper.emitted().itemSelected).toBeTruthy()
    expect(wrapper.emitted().itemSelected[0]).toEqual([items[0]])
  })
})