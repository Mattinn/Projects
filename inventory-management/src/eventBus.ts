import mitt from 'mitt'

const eventBus = mitt<{ 'show-toast': { message: string, type: 'success' | 'error' } }>()

export default eventBus