import React, { Component, useState } from 'react'
import { TouchableOpacity, TextInput, Text, View, Switch } from 'react-native'
import * as yup from 'yup'
import { MaterialIcons } from '@expo/vector-icons'
import Stepper from '@ant-design/react-native/lib/stepper'
import DatePicker from 'react-native-datepicker'

/* Components of UploadForm
FirstInput: First component of the upload form (different label and input container)
StyledInput: TextInputs
DateInput: Date Inputs
RadioInput: Radio button
SelectInput: Select one tag from an array of options
StepperInput: Step count
SwitchInput: Switch button
SwitchInputWithText: Switch button with text input
TagInput: Select multilpe tags from an array of options
*/

export const FirstInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputContainer = {
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    justifyContent: 'center',
    borderLeftWidth: 6,
    borderColor: '#FF8C00'
  }
  const inputStyles = {
    borderBottomWidth: 2,
    borderColor: '#DCDCDC',
    minHeight: 45,
    fontSize: 16,
    marginHorizontal: 16
  }

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red'
    ;(inputStyles.borderBottomWidth = 0.5),
      (inputContainer.backgroundColor = 'rgba(255, 0, 0, 0.1)')
    firstErrorContainer.marginBottom = 10
  }

  return (
    <>
      <View style={inputContainer}>
        <Text style={firstLabelText}>{label}</Text>
        <TextInput
          style={inputStyles}
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          {...rest}
          multiline={true}
        />
        <View style={firstErrorContainer}>
          <Text style={errorStyles}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        </View>
      </View>
    </>
  )
}

export const StyledInput = ({
  label,
  formikProps,
  formikKey,
  numeric,
  required,
  ...rest
}) => {
  return (
    <>
      <View style={labelContainer}>
        <Text style={labelText}>{label}</Text>
      </View>
      <View
        style={{ justifyContent: 'center' }}
        minHeight={label == 'Description' ? 90 : 65}
        backgroundColor={
          formikProps.touched[formikKey] && formikProps.errors[formikKey]
            ? 'rgba(255, 0, 0, 0.1)'
            : '#fff'
        }
        borderLeftWidth={required ? 6 : 0}
        borderColor={required ? '#FF8C00' : null}
      >
        <TextInput
          style={{ fontSize: 16, marginHorizontal: 16 }}
          minHeight={label == 'Description' ? 65 : 45}
          borderBottomWidth={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 0.5
              : 2
          }
          borderColor={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 'red'
              : '#DCDCDC'
          }
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          {...rest}
          keyboardType={numeric}
          multiline={true}
        />
        <View style={errorContainer}>
          <Text style={errorStyles}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        </View>
      </View>
    </>
  )
}

export const DateInput = ({ label, formikProps, formikKey }) => {
  const [date, setDate] = useState('2019-01-01')
  return (
    <View
      style={dateContainer}
      backgroundColor={
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? 'rgba(255, 0, 0, 0.1)'
          : '#fff'
      }
    >
      <Text>{label}</Text>
      <DatePicker
        style={{ width: '75%' }}
        date={date}
        mode='date'
        placeholder='select date'
        format='YYYY-MM-DD'
        minDate='2019-01-01'
        maxDate='2080-01-01'
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginRight: 0
          },
          dateInput: {
            marginRight: 36
          }
        }}
        onDateChange={newDate => {
          formikProps.handleChange(formikKey)
          formikProps.handleBlur(formikKey)
          setDate(newDate)
          formikProps.setFieldValue(formikKey, newDate)
        }}
      />
    </View>
  )
}

export class RadioInput extends Component {
  constructor (props) {
    super(props)
    this.state = { value: null }
  }

  render () {
    const { label, formikProps, formikKey, options, required } = this.props
    return (
      <>
        <View style={labelContainer}>
          <Text style={labelText}>{label}</Text>
        </View>
        <View
          style={radioParentContainer}
          backgroundColor={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 'rgba(255, 0, 0, 0.1)'
              : '#fff'
          }
          borderLeftWidth={required ? 6 : 0}
          borderColor={required ? '#FF8C00' : null}
        >
          {options.map(o => (
            <TouchableOpacity
              key={o}
              style={radioButton}
              onPress={() => {
                formikProps.handleChange(formikKey)
                formikProps.handleBlur(formikKey)
                this.setState({ value: o }, () => {
                  formikProps.setFieldValue(formikKey, this.state.value)
                })
              }}
            >
              <Text style={radioText}>{o}</Text>

              <MaterialIcons
                name={
                  this.state.value == o
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={20}
                color={this.state.value == o ? '#1E90FF' : 'black'}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </>
    )
  }
}

export class SelectInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  onPress (tag) {
    this.props.formikProps.handleChange(this.props.formikKey)
    this.props.formikProps.handleBlur(this.props.formikKey)
    this.setState({ selected: tag }, () => {
      this.props.formikProps.setFieldValue(
        this.props.formikKey,
        this.state.selected
      )
    })
  }

  render () {
    const { label, formikProps, formikKey, options, required } = this.props
    const { selected } = this.state
    return (
      <>
        <View style={labelContainer}>
          <Text style={labelText}>{label}</Text>
        </View>
        <View
          style={selectParentContainer}
          backgroundColor={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 'rgba(255, 0, 0, 0.1)'
              : '#fff'
          }
          borderLeftWidth={required ? 6 : 0}
          borderColor={required ? '#FF8C00' : null}
        >
          {options.map(tag => (
            <View
              key={tag}
              style={selectContainer}
              backgroundColor={selected == tag ? '#2C85DE' : '#ecf0f1'}
            >
              <TouchableOpacity
                style={selectButton}
                onPress={() => {
                  this.onPress(tag)
                }}
              >
                <Text style={{ color: selected == tag ? '#fff' : 'black' }}>
                  {tag}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </>
    )
  }
}

export class SwitchInput extends Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  onSwitch = value => {
    this.props.formikProps.handleChange(this.props.formikKey)
    this.props.formikProps.handleBlur(this.props.formikKey)
    this.setState(
      {
        checked: value
      },
      () => {
        this.props.formikProps.setFieldValue(this.props.formikKey, value)
      }
    )
  }

  render () {
    const { label, formikProps, formikKey, required } = this.props
    const { checked } = this.state
    return (
      <>
        <View
          style={switchContainer}
          backgroundColor={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 'rgba(255, 0, 0, 0.1)'
              : '#fff'
          }
          borderLeftWidth={required ? 6 : 0}
          borderColor={required ? '#FF8C00' : '#DCDCDC'}
        >
          <Text style={switchText}>{label}</Text>
          <Switch
            onValueChange={this.onSwitch}
            value={checked}
            marginRight={16}
          />
        </View>
      </>
    )
  }
}

export class SwitchInputWithText extends Component {
  constructor (props) {
    super(props)
    this.state = { checked: false, value: '' }
  }

  onSwitch = v => {
    this.setState({
      checked: v
    })
    this.props.formikProps.handleChange(this.props.formikKey[0])
    this.props.formikProps.handleBlur(this.props.formikKey[0])
    this.props.formikProps.setFieldValue(this.props.formikKey[0], v)
    if (!v) {
      this.setState({ value: '' })
      this.props.formikProps.setFieldValue(this.props.formikKey[1], '')
    }
  }

  render () {
    const {
      label,
      formikProps,
      formikKey,
      required,
      numeric,
      ...rest
    } = this.props
    const { checked } = this.state
    return (
      <View
        borderLeftWidth={required ? 6 : 0}
        borderColor={required ? '#FF8C00' : null}
      >
        <View style={switchContainer}>
          <Text style={switchText}>{label}</Text>
          <Switch
            onValueChange={this.onSwitch}
            value={checked}
            marginRight={16}
          />
        </View>

        {checked && (
          <View
            style={{
              minHeight: 65,
              justifyContent: 'center'
            }}
            backgroundColor={
              formikProps.touched[formikKey[1]] &&
              formikProps.errors[formikKey[1]]
                ? 'rgba(255, 0, 0, 0.1)'
                : '#fff'
            }
          >
            <TextInput
              style={{
                borderBottomWidth: 2,
                borderColor: '#DCDCDC',
                minHeight: 45,
                fontSize: 16,
                marginHorizontal: 16
              }}
              onChangeText={formikProps.handleChange(formikKey[1])}
              onBlur={formikProps.handleBlur(formikKey[1])}
              {...rest}
              keyboardType={numeric}
            />
            <View style={errorContainer}>
              <Text style={errorStyles}>
                {formikProps.touched[formikKey[1]] &&
                  formikProps.errors[formikKey[1]]}
              </Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export const StepperInput = ({
  label,
  formikProps,
  formikKey,
  required,
  ...rest
}) => {
  return (
    <>
      <View style={labelContainer}>
        <Text style={labelText}>{label}</Text>
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
        backgroundColor={
          formikProps.touched[formikKey] && formikProps.errors[formikKey]
            ? 'rgba(255, 0, 0, 0.1)'
            : '#fff'
        }
        borderLeftWidth={required ? 6 : 0}
        borderColor={required ? '#FF8C00' : null}
      >
        <Stepper
          key='0'
          max={15}
          min={1}
          defaultValue={1}
          onChange={value => {
            formikProps.setFieldValue(formikKey, value)
          }}
          inputStyle={{ marginBottom: 15 }}
        />
      </View>
    </>
  )
}

export class TagInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: []
    }
  }

  onPress (tag) {
    this.props.formikProps.handleChange(this.props.formikKey)
    this.props.formikProps.handleBlur(this.props.formikKey)
    const current = this.state.selected
    let newArray
    if (current.includes(tag)) {
      newArray = current.filter(c => {
        return c !== tag
      })
    } else {
      current.push(tag)
      newArray = current
    }
    this.setState({ selected: newArray }, () => {
      this.props.formikProps.setFieldValue(
        this.props.formikKey,
        this.state.selected
      )
    })
  }

  render () {
    const { label, formikProps, formikKey, options, required } = this.props
    const { selected } = this.state
    return (
      <>
        <View style={labelContainer}>
          <Text style={labelText}>{label}</Text>
        </View>
        <View
          style={tagParentContainer}
          backgroundColor={
            formikProps.touched[formikKey] && formikProps.errors[formikKey]
              ? 'rgba(255, 0, 0, 0.1)'
              : '#fff'
          }
          borderLeftWidth={required ? 6 : 0}
          borderColor={required ? '#FF8C00' : null}
        >
          {options.map(tag => (
            <View
              key={tag}
              style={tagContainer}
              backgroundColor={selected.includes(tag) ? '#2C85DE' : '#ecf0f1'}
            >
              <TouchableOpacity
                style={tagButton}
                onPress={() => {
                  this.onPress(tag)
                }}
              >
                <Text
                  style={{ color: selected.includes(tag) ? '#fff' : 'black' }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </>
    )
  }
}

const firstLabelText = {
  color: '#1E90FF',
  fontSize: 12,
  marginLeft: 16
}

const errorStyles = {
  fontSize: 12,
  color: 'red',
  marginLeft: 16
}

const firstErrorContainer = {
  height: 0,
  width: 250
}

const labelContainer = {
  backgroundColor: '#ecf0f1',
  height: 80,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#DCDCDC'
}

const labelText = {
  textTransform: 'uppercase',
  marginLeft: 22,
  marginTop: 40,
  marginBottom: 10
}

const dateContainer = {
  paddingVertical: 10,
  paddingHorizontal: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderLeftWidth: 6,
  borderLeftColor: '#FF8C00',
  borderTopWidth: 1,
  borderTopColor: '#DCDCDC'
}

const errorContainer = {
  marginBottom: 15,
  height: 0,
  width: 250
}

const radioButton = {
  minHeight: 50,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 0.5,
  borderColor: '#DCDCDC'
}
const radioText = {
  marginLeft: 16,
  fontSize: 15
}

const radioParentContainer = {
  backgroundColor: '#FFFFFF',
  justifyContent: 'center'
}

const tagParentContainer = {
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const tagContainer = {
  borderRadius: 20,
  paddingHorizontal: 10,
  height: 40,
  margin: 10
}

const tagButton = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 40
}

const selectParentContainer = {
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const selectContainer = {
  width: '30%',
  paddingVertical: 10,
  margin: 5
}

const selectButton = {
  justifyContent: 'center',
  alignItems: 'center'
}

const switchContainer = {
  height: 50,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTopWidth: 1,
  borderColor: '#DCDCDC'
}

const switchText = { marginLeft: 16, fontSize: 15 }

// yup.addMethod(yup.type, "cornellEmail", function() {
//   return this.test("cornellEmail", "Invalid Cornell email", function(value) {
//     return value.match(/^([a-z]{1,3})([0-9]{1,4})@(cornell.edu)$/);
//     // return someCondition || conditionTwo || createError(...);
//   });
// });

// Yup.addMethod https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470

export const validationSchemaItem = yup.object().shape({
  title: yup.string().required('Please fill in a title'),
  price: yup
    .number('Please enter a valid number')
    .required('Please fill in a price')
    .min('Price must be at least $1')
    .positive('Price must be a positive value'),
  condition: yup.string().required(),
  description: yup.string().required('Please enter a description'),
  dealMethod: yup.array().required()
})

export const validationSchemaHousing = yup.object().shape({
  title: yup.string().required('Please fill in a title'),
  price: yup
    .number('Please enter a valid number')
    .required('Please fill in a price')
    .min('Price must be at least $1')
    .positive('Price must be a positive value'),
  description: yup.string(),
  startLease: yup
    .string()
    .test('dates-match', 'Start and end dates must be different', function (
      value
    ) {
      return this.parent.endLease !== value
    }),
  endLease: yup
    .string()
    .test('dates-match', 'Start and end dates must be different', function (
      value
    ) {
      return this.parent.startLease !== value
    }),
  beds: yup.number().required(),
  baths: yup.number().required(),
  furnishing: yup.string().required(),
  parking: yup.boolean(),
  pets: yup.boolean(),
  parkingPrice: yup.string().when('parking', {
    is: true,
    then: yup.string().required('Please fill in a price'),
    otherwise: yup.string()
  }),
  petsPrice: yup.string().when('pets', {
    is: true,
    then: yup.string().required('Please fill in a price'),
    otherwise: yup.string()
  })
})
