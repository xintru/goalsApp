import * as type from '../constants/actions/auth'

export const initialState = {
  token: '',
  tokenExpirationDate: '',
  userId: '',
  username: '',
  userAvatar: '',
}

const authReducer = (state, action) => {
  switch (action.type) {
    case type.SET_AUTH_STATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
        userAvatar: action.avatar,
      }
    case type.SET_EXP_DATE:
      return {
        ...state,
        tokenExpirationDate: action.expDate,
      }
    case type.RESET_AUTH_STATE:
      return initialState
    case type.UPDATE_AVATAR: {
      return {
        ...state,
        userAvatar: action.avatar,
      }
    }
    default:
      return state
  }
}

export default authReducer
