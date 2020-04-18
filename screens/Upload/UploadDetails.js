import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import {
  getCategory,
  uploadItem,
  uploadHousing,
  resetForm
} from '../../reducers/uploadReducer'
import UploadNormalItem from './UploadNormalItem'
import UploadHousingItem from './UploadHousingItem'

const UploadDetails = props => {
  return (
    <View style={styles.container}>
      {props.category == 'Housing' ? (
        <UploadHousingItem />
      ) : (
        <UploadNormalItem />
      )}
    </View>
  )
}

const mapStateToProps = store => ({
  category: getCategory(store.uploadReducer)
})

const mapDispatchToProps = dispatch => ({
  uploadItem: payload => dispatch(uploadItem(payload)),
  uploadHousing: payload => dispatch(uploadHousing(payload)),
  resetForm: () => dispatch(resetForm())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDetails)

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' }
})
