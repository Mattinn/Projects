import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Toast from '../../src/components/Toast.vue'
import eventBus from '../../src/eventBus'

describe('Toast.vue', () => {
  it('renders a message when show-toast event is emitted', async () => {
    const wrapper = mount(Toast)

    eventBus.emit('show-toast', { message: 'Test message', type: 'success' })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Test message')
  })

  it('hides the toast after the dismiss button is clicked', async () => {
    const wrapper = mount(Toast)

    eventBus.emit('show-toast', { message: 'Test message', type: 'success' })

    await wrapper.vm.$nextTick()

    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).not.toContain('Test message')
  })

  it('applies the correct CSS classes for success type', async () => {
    const wrapper = mount(Toast)

    eventBus.emit('show-toast', { message: 'Success message', type: 'success' })

    await wrapper.vm.$nextTick()

    const toastDiv = wrapper.find('div')
    expect(toastDiv.classes()).toContain('bg-green-500')
    expect(toastDiv.classes()).toContain('border-green-800')
  })

  it('applies the correct CSS classes for error type', async () => {
    const wrapper = mount(Toast)

    eventBus.emit('show-toast', { message: 'Error message', type: 'error' })

    await wrapper.vm.$nextTick()

    const toastDiv = wrapper.find('div')
    expect(toastDiv.classes()).toContain('bg-red-500')
    expect(toastDiv.classes()).toContain('border-red-800')
  })
})