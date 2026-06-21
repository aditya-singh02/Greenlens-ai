import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

export const fetchAllWards = async () => {
  const res = await api.get('/wards')
  return res.data.data
}

export const fetchWardById = async (id) => {
  const res = await api.get(`/ward/${id}`)
  return res.data.data
}

export const fetchRecommendation = async (id) => {
  const res = await api.get(`/recommend/${id}`)
  return res.data.data
}

export default api
