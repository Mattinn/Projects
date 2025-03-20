export async function addItem(item: { name: string, quantity: number, sku: string, description: string, price: number }) {
  try {
    const response = await fetch('/api/inventory/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: item.name,
        quantity: item.quantity.toString(),
        sku: item.sku,
        description: item.description,
        price: item.price.toString()
      }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function updateItem(id: number, item: { name: string, quantity: number, sku: string, description: string, price: number }) {
  try {
    const response = await fetch(`/api/inventory/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: item.name,
        quantity: item.quantity.toString(),
        sku: item.sku,
        description: item.description,
        price: item.price.toString()
      }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function deleteItem(id: number) {
  try {
    const response = await fetch(`/api/inventory/${id}/`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete item')
    }
  } catch (error) {
    throw error
  }
}

export async function fetchItem(id: number) {
  try {
    const response = await fetch(`/api/inventory/${id}/`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch item')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function fetchItems() {
  try {
    const response = await fetch('/api/inventory/', {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch items')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}