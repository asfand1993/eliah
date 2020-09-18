import { create } from 'apisauce'

const api = create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_V1,
  headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY }
})

export const getProducts = async slug => {
  const response = await api.get(`/catalog/products/`)
  if (response.ok && response.data) {
    return response.data
  }

  return null
}
