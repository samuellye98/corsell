import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { types, signupSuccess, signupFailure } from '../reducers/signupReducer';

var firebase = require('firebase/app');

export function* verifyFormFields({ payload }) {
  yield put({ type: types.VERIFYING_SIGNUP });
  let userId;
  try {
    yield new Promise((res, rej) => {
      console.log('here');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((ref) => {
          userId = ref.user.uid;
          console.log('Created user with UID: ', userId);
          res();
        })
        .catch((err) => {
          rej(err);
        });
    }).catch((err) => {
      console.log(
        `Failed to create user for ${payload.name}. Reason for failure was ${err}`
      );
      throw err;
    });

    yield new Promise((res, rej) => {
      let db = firebase.firestore();
      db.collection('userDetails')
        .doc(userId)
        .set({
          email: payload.email,
          username: payload.username,
          name: payload.name,
          phone: payload.phone,
          major: payload.major,
          year: payload.year,
          address: payload.address,
        })
        .then(() => {
          console.log(`Added User document with ID: ${userId}`);
          res();
        })
        .catch((err) => {
          rej(err);
        });
    }).catch((err) => {
      console.log(
        `Failed to add User document for ${payload.name}. Reason for failure was ${err}`
      );
      throw err;
    });
    yield put(signupSuccess());
  } catch (e) {
    yield put(signupFailure(e.message));
  }
}

export default [takeLatest(types.HANDLE_SIGNUP, verifyFormFields)];
