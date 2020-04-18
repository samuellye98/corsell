import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

class ImageItem extends Component {
  componentDidMount() {
    let { width } = Dimensions.get('window');
    const { imageMargin, imagesPerRow, containerWidth } = this.props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    const { item, selected, selectedMarker, imageMargin } = this.props;

    const marker = selectedMarker || (
      <AntDesign name="checkcircle" style={styles.marker} size={25} />
    );

    const { uri } = item;

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        // onPress={() => this.handleClick(image)}
        onPress={() => this.handleClick(item)}
      >
        <Image
          source={{ uri: uri }}
          style={{ height: this.imageSize, width: this.imageSize }}
          opacity={selected ? 0.5 : 1}
        />
        {selected ? marker : null}
      </TouchableOpacity>
    );
  }
}

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

ImageItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number,
  imagesPerRow: PropTypes.number,
  onClick: PropTypes.func,
};

export default ImageItem;
