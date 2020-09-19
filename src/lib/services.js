import { create } from 'apisauce'
console.log('process.env', process.env.PUBLIC_API_KEY)
const api = create({
  baseURL: process.env.PUBLIC_BASE_URL_V1,
  headers: { 'x-api-key': process.env.PUBLIC_API_KEY }
})

export const getProductsApi = async () => {
  const response = await api.get(`/catalog/products/`)
  console.log('response ', response)
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
