import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CameraRoll,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraRollPicker from '../CameraRollPicker/CameraRollPicker';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  uploadImages,
  getImages,
  resetForm,
} from '../../reducers/uploadReducer';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: [] };

    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  getSelectedImages(images) {
    this.setState({ selected: images }, () => {
      this.props.uploadImages(this.state.selected);
    });
  }

  shouldComponentUpdate(nextState) {
    if (this.state.selected != nextState.selected) {
      return false;
    }
    return true;
  }

  selectCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      await CameraRoll.saveToCameraRoll(result.uri);

      CameraRoll.getPhotos({ first: 1 })
        .then((r) => {
          let selected = {
            height: r.edges[0].node.image.height,
            width: r.edges[0].node.image.width,
            uri: r.edges[0].node.image.uri,
          };
          return selected;
        })
        .then((s) => {
          this.setState(
            {
              selected: this.state.selected.concat([s]),
            },
            () => {
              this.props.uploadImages(this.state.selected);
            }
          );
          this._cameraRollPicker.refresh();
          this._cameraRollPicker.selectImage(s);
        });
    }
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => goBack()}>
            <Entypo name="cross" size={38} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerMainText}>Tap to select images</Text>
            <Text style={styles.headerSideText}>Select up to 10 photos</Text>
          </View>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => this.selectCamera()}
          >
            <EvilIcons name="camera" size={45} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.images.length < 1
                ? alert('Select at least one image')
                : navigate('UploadCategory');
            }}
            style={styles.nextTextContainer}
          >
            <Text style={styles.nextText}>NEXT</Text>
          </TouchableOpacity>
        </View>
        <CameraRollPicker
          callback={this.getSelectedImages}
          imageMargin={10}
          ref={(ref) => (this._cameraRollPicker = ref)}
          selected={this.state.selected}
        />
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  images: getImages(store.uploadReducer),
});

const mapDispatchToProps = (dispatch) => ({
  uploadImages: (payload) => dispatch(uploadImages(payload)),
  resetForm: () => dispatch(resetForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

UploadImage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  header: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c85de',
  },
  closeIcon: {
    position: 'absolute',
    bottom: 5,
    left: 8,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 50,
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
  },
  headerMainText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  headerSideText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'montserrat-light',
  },
  nextTextContainer: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
  nextText: {
    color: '#fff',
    fontWeight: '500',
  },
});

UploadImage.navigationOptions = {
  header: null,
};
