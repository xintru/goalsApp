/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import { createBrowserHistory } from 'history'
import LocalStorageService from '../services/LocalStorageService'

const localStorageService = new LocalStorageService()
const history = createBrowserHistory()

// Automatic addition of a token to request if there is a token.

const createTokenInterceptor = (config) => {
  const newConfig = { ...config }
  const token = localStorageService.getToken()
    ? localStorageService.getToken().token
    : null
  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`
  }
  return newConfig
}

// Refresh token flow

const createRefreshTokenInterceptor = async (error) => {
  const originalRequest = error.config
  if (
    error.response.status === 403 &&
    originalRequest.url === 'http://localhost:3000/api/auth/refresh'
  ) {
    history.push('/')
    return Promise.reject(error)
  }
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    try {
      const response = await axios.get('/api/auth/refresh')
      if (response && response.status === 201) {
        localStorageService.setToken(response.data)
        axios.defaults.headers.common.Authorization = `Bearer ${
          localStorageService.getToken()
            ? localStorageService.getToken().token
            : null
        }`
      }
    } catch (err) {
      return Promise.reject(err)
    }

    return axios(originalRequest)
  }
  return Promise.reject(error)
}

axios.interceptors.request.use(createTokenInterceptor, (error) =>
  Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  createRefreshTokenInterceptor
)

export default axios
