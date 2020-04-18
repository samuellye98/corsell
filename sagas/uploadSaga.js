import { put, takeEvery, call, all, takeLatest } from 'redux-saga/effects'
import { types } from '../reducers/uploadReducer'
// var firebase = require('firebase/app')

// var db = firebase.firestore()

export function * uploadItemFunction ({ payload }) {
  //   db.collection('itemDetails').add({
  //     name: payload.name,
  //     price: payload.price,
  //     description: payload.description
  //   })
  //   yield
  //   return true
}

export function * uploadingHousingFunction ({ payload }) {}

export default [
  takeLatest(types.UPLOADING_ITEM, uploadItemFunction),
  takeLatest(types.UPLOADING_HOUSING, uploadingHousingFunction)
]
