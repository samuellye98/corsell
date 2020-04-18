import React from 'react'
import { showMessage as show } from 'react-native-flash-message'

const SignupResultMessage = ({ showMessage, success, error }) => {
  const message =
    showMessage &&
    (success
      ? show({
          message: 'Signup Successful!',
          description: 'A confirmation email has been sent.',
          type: 'success',
          floating: true
        })
      : show({
          message: 'Signup Failed',
          description: error,
          type: 'danger',
          floating: true
        }))

  return <>{message}</>
}

export default SignupResultMessage
