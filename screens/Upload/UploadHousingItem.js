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
  DateInput,
  SelectInput,
  StepperInput,
  SwitchInput,
  SwitchInputWithText,
  TagInput,
  validationSchemaHousing
} from './UploadForm'

const UploadNormalItem = () => (
  <Formik
    initialValues={{
      title: '',
      description: '',
      price: '',
      postalCode: '',
      address: '',
      startLease: '',
      endLease: '',
      beds: 1,
      baths: 1,
      features: [],
      utilities: [],
      facilities: [],
      furnishing: '',
      parking: false,
      parkingPrice: '',
      pets: false,
      petsPrice: '',
      agent: false,
      contact: '',
      attachment: []
    }}
    onSubmit={values => console.log('values', values)}
    validationSchema={validationSchemaHousing}
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
              label='Rent'
              formikProps={formikProps}
              formikKey='price'
              placeholder='Rent per month'
              numeric='numeric'
              required={true}
            />
            <DateInput
              label='Lease Start'
              formikProps={formikProps}
              formikKey='startLease'
            />
            <DateInput
              label='Lease End'
              formikProps={formikProps}
              formikKey='endLease'
            />
            <StepperInput
              label='Beds'
              formikProps={formikProps}
              formikKey='beds'
              required={true}
            />
            <StepperInput
              label='Baths'
              formikProps={formikProps}
              formikKey='baths'
              required={true}
            />
            <TagInput
              label='Features'
              formikProps={formikProps}
              formikKey='features'
              options={[
                'Balcony',
                'Cooker Hob/Hood',
                'Dishwasher',
                'In-sink disposal',
                'Living Room',
                'Microwave',
                'Oven',
                'Refrigerator',
                'Television',
                'Vent Hood',
                'Walk-in Wardrobe'
              ]}
              required={false}
            />
            <TagInput
              label='Utilities Provided'
              formikProps={formikProps}
              formikKey='utilities'
              options={[
                'Air Conditioning',
                'Electricity',
                'Gas',
                'Heating',
                'Internet',
                'Trash & Recycling',
                'Water'
              ]}
              required={false}
            />
            <TagInput
              label='Facilities'
              formikProps={formikProps}
              formikKey='facilities'
              options={[
                'Bike Storage',
                'Fitness Center',
                'In-Unit Laundry',
                'Lounge',
                'Sauna',
                'Service Desk',
                'Study Room',
                'Theatre'
              ]}
              required={false}
            />
            <SelectInput
              label='Furnishing'
              formikProps={formikProps}
              formikKey='furnishing'
              options={['None', 'Partial', 'Full']}
              required={true}
            />
            <SwitchInputWithText
              label='Pets'
              formikProps={formikProps}
              formikKey={['pets', 'petsPrice']}
              placeholder='Pets fee'
              required={false}
            />
            <SwitchInputWithText
              label='Parking'
              formikProps={formikProps}
              formikKey={['parking', 'parkingPrice']}
              placeholder='Parking fee per month'
              numeric={'numeric'}
              required={false}
            />
            <SwitchInput
              label='Agent'
              formikProps={formikProps}
              formikKey='agent'
              required={false}
            />
            <StyledInput
              label='Contact'
              formikProps={formikProps}
              formikKey='contact'
              placeholder='Contact Information (eg. website, Facebook, phone)'
              multiline={true}
              required={false}
            />
            <StyledInput
              label='Description'
              formikProps={formikProps}
              formikKey='description'
              placeholder='Any additional information'
              required={false}
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
