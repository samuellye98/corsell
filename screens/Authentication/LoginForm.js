import React from 'react'
import { TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import metrics from '../../config/metrics'

export const StyledInput = ({
  label,
  loginFailure,
  formikProps,
  formikKey,
  iconName,
  ...rest
}) => {
  const inputContainer = {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#fff',
    width: metrics.DEVICE_WIDTH * 0.8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  }

  const inputIcon = {
    marginLeft: 15,
    justifyContent: 'center'
  }

  const inputStyles = {
    fontFamily: 'montserrat-regular',
    height: 45,
    marginLeft: 16,
    flex: 1
  }

  if (loginFailure) {
    inputContainer.borderColor = 'red'
  }

  return (
    <>
      <View style={inputContainer}>
        <View style={inputIcon}>
          <AntDesign name={iconName} size={30} color='#2C85DE' />
        </View>
        <TextInput
          style={inputStyles}
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          {...rest}
        />
      </View>
    </>
  )
}
