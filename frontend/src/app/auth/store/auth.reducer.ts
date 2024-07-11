import { Auth } from '../auth.model'
import * as AuthActions from './auth.actions'

export interface State {
  user?: Auth
  authError?: string
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export function authReducer(state = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new Auth(action.payload.email, action.payload.token, action.payload.expirationDate)
      return {
        ...state,
        authError: undefined,
        user,
        loading: false,
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: undefined,
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
    case AuthActions.REFRESH_TOKEN:
      return {
        ...state,
        authError: undefined,
        loading: true,
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: undefined,
        authError: action.payload,
        loading: false,
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: undefined,
      }
    default:
      return state
  }
}
