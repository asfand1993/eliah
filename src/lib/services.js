import { create } from 'apisauce'

const api = create({
  baseURL: process.env.PUBLIC_BASE_URL_V1,
  headers: { 'x-api-key': process.env.PUBLIC_API_KEY }
})

export const getProductsApi = async options => {
  const response = await api.get(`/catalog/products/`)
  if (response.ok && response.data) {
    return response.data
  }

  return null
}

export const getProductBySlugApi = async slug => {
  const response = await api.get(`/catalog/products/slugs/${slug}`)
  console.log('response ', response)
  if (response.ok && response.data) {
    return response.data
  }

  return null
}

export const searchProductsApi = async params => {
  const response = await api.post('/catalog/products/search', {
    ...params
  })
  if (response.ok && response.data) {
    return response.data
  }

  return null
}

export const registerUser = async body => {
  const response = await api.post('/customer/register', body)
  if (response.ok && response.data) {
    return response.data
  }

  return null
}

export const loginUser = async body => {
  const response = await api.post('/customer/login', body)
  if (response.ok && response.data) {
    return response.data
  }

  return null
}
