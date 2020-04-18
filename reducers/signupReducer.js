export const initialState = {
  verifying: false,
  values: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    phone: '',
    year: '',
    major: '',
    address: '',
  },
  signupError: '',
  //signupErrorCode: null,
  signupSuccess: false,
  signupFailure: false,
};

// Types
export const types = {
  SIGNUP: 'SIGNUP',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  VERIFYING_SIGNUP: 'VERIFYING_SIGNUP',
  HANDLE_SIGNUP: 'HANDLE_SIGNUP',
  RESET_FORM: 'RESET_FORM',
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.HANDLE_SIGNUP:
      console.log('hi');
      const event = action.payload;
      return {
        ...state,
        values: {
          email: event.email,
          password: event.password,
          confirmPassword: event.confirmPassword,
          name: event.name,
          username: event.username,
          phone: event.phone,
          year: event.year,
          major: event.major,
          address: event.address,
        },
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        verifying: false,
        signupSuccess: true,
        signupFailure: false,
        signupError: '',
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        verifying: false,
        signupSuccess: false,
        signupFailure: true,
        signupError:
          typeof action.error === 'string'
            ? action.error
            : 'An error has occurred. Please try again later.',
      };
    case types.VERIFYING_SIGNUP:
      return {
        ...state,
        verifying: true,
      };
    case types.RESET_FORM:
      return {
        ...initialState,
        signupSuccess: false, //true,
        signupFailure: false,
        signupError: '',
      };
    default:
      return state;
  }
}

// Actions
export function handleSignup(payload) {
  return {
    type: types.HANDLE_SIGNUP,
    payload,
  };
}

export function signupSuccess() {
  return {
    type: types.SIGNUP_SUCCESS,
  };
}

export function signupFailure(error) {
  return {
    type: types.SIGNUP_FAILURE,
    error,
  };
}

export function resetForm() {
  return {
    type: types.RESET_FORM,
  };
}

// Getters
export function getVerifying(state) {
  return state.verifying;
}

export function getSuccess(state) {
  return state.signupSuccess;
}

export function getFailure(state) {
  return state.signupFailure;
}

export function getError(state) {
  return state.signupError;
}
