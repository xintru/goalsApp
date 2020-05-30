/* eslint-disable class-methods-use-this */

// Service that works with localStorage to store access token and user data.

class LocalStorageService {
  getService() {
    return this
  }

  getToken() {
    const tokenJSON = localStorage.getItem('access_token')
    let parsedToken
    if (tokenJSON) {
      parsedToken = JSON.parse(tokenJSON)
    }
    return parsedToken
  }

  setToken(tokenObj) {
    return localStorage.setItem('access_token', JSON.stringify(tokenObj))
  }

  setUserData(data) {
    return localStorage.setItem('userData', JSON.stringify(data))
  }

  getUserData() {
    const dataJSON = localStorage.getItem('userData')
    let parsedData
    if (dataJSON) {
      parsedData = JSON.parse(dataJSON)
    }
    return parsedData
  }

  clearStorage() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('userData')
  }
}

export default LocalStorageService
