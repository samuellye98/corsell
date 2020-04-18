import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ImageEditor,
  Platform
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { getImages, setCategory } from '../../reducers/uploadReducer'

class UploadCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [
        'Bicycles & PMDs',
        'Business Services (eg. Tuition, Photography)',
        'Car',
        'Design & Craft',
        'Education',
        'Electronics',
        'Entertainment',
        "Men's Fashion",
        "Women's Fashion",
        'Food & Drinks',
        'Furniture',
        'Gardening',
        'Health & Beauty',
        'Home Appliances',
        'Home Services',
        'Housing',
        'Jobs',
        'Stationery',
        'Sports',
        'Toys & Games',
        'Travel',
        'Everything Else'
      ]
    }
  }

  renderImageFiller () {
    var fillers = []
    for (var i = this.props.selectedImages.length; i < 10; i++) {
      fillers.push(i)
    }

    return fillers.map(f => (
      <TouchableOpacity
        key={f}
        style={styles.imageFiller}
        onPress={() => this.props.navigation.navigate('UploadImage')}
      >
        <AntDesign name='pluscircleo' size={50} color='#cfd9db' />
      </TouchableOpacity>
    ))
  }

  // async editImage(image) {
  //   await new Promise((resolve, reject) => {
  //     ImageEditor.cropImage(
  //       image.uri,
  //       {
  //         offset: { x: 0, y: 0 },
  //         size: { width: image.width, height: image.height },
  //         displaySize: { width: 50, height: 50 },
  //         resizeMode: 'contain'
  //       },
  //       uri => resolve(uri),
  //       () => reject()
  //     )
  //   })
  // }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={{ height: 135 }}>
          <ScrollView horizontal={true} style={styles.imageContainer}>
            {this.props.selectedImages.map(image => (
              <TouchableOpacity
                key={image.uri}
                style={styles.imageShadow}
                // onPress={i => this.editImage(i)} // Edit image on press and save
              >
                <Image style={styles.image} source={{ uri: image.uri }} />
              </TouchableOpacity>
            ))}
            {this.renderImageFiller()}
          </ScrollView>
        </View>
        <View style={styles.imageHeaderContainer}>
          <Text style={styles.imageHeader}>
            Tap to edit images and add a caption
          </Text>
        </View>
        <ScrollView style={{ width: '100%' }}>
          {this.state.categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={styles.categoryContainer}
              onPress={() => {
                this.props.setCategory(cat)
                navigate('UploadDetails')
              }}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = store => ({
  selectedImages: getImages(store.uploadReducer)
})

const mapDispatchToProps = dispatch => ({
  setCategory: payload => dispatch(setCategory(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCategory)

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  imageFiller: {
    backgroundColor: '#fff',
    height: 125,
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10
  },
  imageContainer: {
    backgroundColor: '#ecf0f1'
  },
  imageShadow: {
    shadowColor: '#202020',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5
  },
  image: { height: 125, width: 70, margin: 5, borderRadius: 8 },
  imageHeaderContainer: {
    backgroundColor: '#ecf0f1',
    height: 50,
    width: '100%',
    justifyContent: 'center'
  },
  imageHeader: {
    marginLeft: 10,
    marginRight: 'auto'
  },
  categoryContainer: {
    height: 60,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: '#ecf0f1'
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'roboto-regular'
  }
})
