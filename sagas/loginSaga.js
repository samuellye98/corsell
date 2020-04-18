import { put, takeLatest } from 'redux-saga/effects';
import {
  types,
  loginSuccess,
  loginFailure,
  verifyingLoginEmailSuccess,
  verifyingLoginEmailFailure,
  verifyingLoginPasswordSuccess,
  verifyingLoginPasswordFailure,
} from '../reducers/loginReducer';
import { storeToken } from '../services/token';
var firebase = require('firebase/app');

export function* verifyLoginEmail({ form }) {
  try {
    const email = form.email;

    if (email == null) {
      throw new Error('Email cannot be empty!');
    }

    yield put(verifyingLoginEmailSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingLoginEmailFailure({
        email: form.email,
        error: e.message,
      })
    );
    return false;
  }
}

export function* verifyLoginPassword({ form }) {
  try {
    const password = form.password;

    if (password == null) {
      throw new Error('Password cannot be empty!');
    }

    yield put(verifyingLoginPasswordSuccess());
    return true;
  } catch (e) {
    yield put(
      verifyingLoginPasswordFailure({
        password: form.password,
        error: e.message,
      })
    );
    return false;
  }
}

export function* verifyLoginForm({ payload }) {
  yield put({ type: types.VERIFYING_LOGIN });

  try {
    yield firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(function (error) {
        throw new Error(error);
      });

    yield storeToken(payload.email, payload.password);

    yield put(loginSuccess());
    console.log('LOGIN SUCCESSFUL');
    return true;
  } catch (e) {
    yield put(loginFailure());
    return false;
  }
}

export default [takeLatest(types.UPDATE_LOGIN_FIELDS, verifyLoginForm)];
