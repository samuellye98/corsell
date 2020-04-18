import React from 'react'
import { TextInput, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as yup from 'yup'
import metrics from '../../config/metrics'

export const StyledInput = ({
  label,
  formikProps,
  formikKey,
  iconName,
  ...rest
}) => {
  const inputContainer = {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    width: metrics.DEVICE_WIDTH * 0.8,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
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

  const errorContainer = {
    width: 250,
    marginHorizontal: 30
  }

  const errorStyles = {
    fontSize: 10,
    color: 'red'
  }

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputContainer.borderColor = 'red'
    inputContainer.borderWidth = 0.5
    errorContainer.marginBottom = 8
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
      <View style={errorContainer}>
        <Text style={errorStyles}>
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
      </View>
    </>
  )
}

// yup.addMethod(yup.type, "cornellEmail", function() {
//   return this.test("cornellEmail", "Invalid Cornell email", function(value) {
//     return value.match(/^([a-z]{1,3})([0-9]{1,4})@(cornell.edu)$/);
//     // return someCondition || conditionTwo || createError(...);
//   });
// });

// Yup.addMethod https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470
// Check if email exists in database
// Check if email is an actual email address
// Check if username exists in database
// Check if

export const validationSchema0 = yup.object().shape({
  email: yup
    .string()
    .required('Cornell Email is required')
    .matches(
      /^([a-z]{1,3})([0-9]{1,4})@(cornell.edu)$/,
      'Valid Cornell email is required'
    ),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must contain at least 8 characters, include 1 lowercase letter, 1 uppercase letter, and 1 number'
    )
    .min(2, 'Too short')
    .max(12, 'Too long'),
  confirmPassword: yup
    .string()
    .required('This field cannot be empty!')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
})

export const validationSchema1 = yup.object().shape({
  username: yup.string().required('This field cannot be empty!'),
  name: yup.string().required('This field cannot be empty!'),
  phone: yup.string().required('This field cannot be empty!')
})

export const validationSchema2 = yup.object().shape({
  year: yup
    .string()
    .matches(/^[2][0][1-9]\d{1}$/, 'Enter a valid year')
    .required('This field cannot be empty!'),
  major: yup.string().required('This field cannot be empty!'),
  address: yup.string().required('This field cannot be empty!')
})
