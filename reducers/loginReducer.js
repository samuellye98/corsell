export const initialState = {
  verifying: false,
  loginSuccess: false,
  loginFailure: false,
  values: {
    email: "",
    password: ""
  },
  currentUser: null
};

// Types
export const types = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  VERIFYING_LOGIN: "VERIFYING_LOGIN",
  UPDATE_LOGIN_FIELDS: "UPDATE_LOGIN_FIELDS",
  RESET_LOGIN_FORM: "RESET_LOGIN_FORM",
  CURRENT_USER: "CURRENT_USER"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LOGIN_FIELDS:
      const event = action.payload;
      return {
        ...initialState,
        values: {
          email: event.email,
          password: event.password
        }
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        verifying: false,
        loginSuccess: true,
        loginFailure: false
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        verifying: false,
        loginSuccess: false,
        loginFailure: true
      };
    case types.VERIFYING_LOGIN:
      return {
        ...state,
        verifying: true
      };
    case types.RESET_LOGIN_FORM:
      return {
        ...initialState
      };
    case types.CURRENT_USER:
      return {
        ...state,
        currentUser: event.user
      };
    default:
      return state;
  }
}

// Actions
export function updateLoginForm(payload) {
  return {
    type: types.UPDATE_LOGIN_FIELDS,
    payload
  };
}

export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE
  };
}

export function resetLoginForm() {
  return {
    type: types.RESET_LOGIN_FORM
  };
}

export function setCurrentUser(payload) {
  return {
    type: types.CURRENT_USER,
    payload
  };
}

// Getters
export function getLoginVerifying(state) {
  return state.verifying;
}

export function getLoginSuccess(state) {
  return state.loginSuccess;
}

export function getLoginFailure(state) {
  return state.loginFailure;
}
