import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
} from '../actions';

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  isError: false,
  registerMessage: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
      };

    case USER_LOGIN_COMPLETED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };

    case USER_LOGIN_ERROR:
      return {
        data: null,
        isLoading: false,
        isError: true,
      };

    case USER_LOGIN_RESET:
      return INITIAL_STATE;

    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        registerMessage: null,
      };

    case USER_REGISTER_COMPLETED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        registerMessage: action.payload.message || 'Registration successful!',
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        registerMessage: action.payload,
      };

    case USER_REGISTER_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const userRegister = payload => ({
  type: USER_REGISTER,
  payload,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET
});

export const resetRegister = () => ({
  type: USER_REGISTER_RESET
});