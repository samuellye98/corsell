import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { Formik } from 'formik'
import {
  FirstInput,
  StyledInput,
  RadioInput,
  TagInput,
  SwitchInput,
  validationSchemaItem
} from './UploadForm'

const UploadNormalItem = () => (
  <Formik
    initialValues={{
      title: '',
      price: '',
      description: '',
      condition: '',
      dealMethod: []
    }}
    onSubmit={values => console.log('values', values)}
    validationSchema={validationSchemaItem}
  >
    {formikProps => (
      <>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
          behavior='padding'
        >
          <ScrollView>
            <FirstInput
              label='Listing Title'
              formikProps={formikProps}
              formikKey='title'
              placeholder='Name your listing'
              required={true}
            />
            <StyledInput
              label='Price'
              formikProps={formikProps}
              formikKey='price'
              placeholder='Price of your listing'
              numeric='numeric'
              required={true}
            />
            <RadioInput
              label='Item Condition'
              formikProps={formikProps}
              formikKey='condition'
              options={['New', 'Used']}
              required={true}
            />
            <StyledInput
              label='Description'
              formikProps={formikProps}
              formikKey='description'
              placeholder='Describe what you are selling and include any details a buyer might be interested in. People love items with stories!'
              required={true}
            />
            <TagInput
              label='Deal Method'
              formikProps={formikProps}
              formikKey='dealMethod'
              options={['Meet Up', 'Delivery']}
              required={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={formikProps.handleSubmit}
          >
            <Text style={styles.buttonText}>LIST IT!</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
  </Formik>
)

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#1E90FF'
  },
  button: {
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default UploadNormalItem
