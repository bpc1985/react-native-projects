import React, {useState} from 'react';
import PropTypes from "prop-types";
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AuthorRow from './AuthorRow';

function Card({ fullname, image, linkText, onPressLinkText}) {
  const [loading, setLoading] = useState(false);
  const handleLoad = () => setLoading(false);

  return (
    <View>
      <View style={styles.image}>
        {loading &&
          <ActivityIndicator style={StyleSheet.absoluteFill} color="#0000ff" size={'large'} />}
        <Image
          style={StyleSheet.absoluteFill}
          source={image}
          onLoad={handleLoad} />
      </View>
      <AuthorRow
        fullname={fullname}
        linkText={linkText}
        onPressLinkText={onPressLinkText} />
    </View>
  )
}

Card.propTypes = {
  fullname: PropTypes.string.isRequired,
  image: Image.propTypes.source.isRequired,
  linkText: PropTypes.string.isRequired,
  onPressLinkText: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1, // to make the height of the Image match its full-screen width, rendering as a perfect square
    backgroundColor: 'rgba(0,0,0,0.02)', // a backgroundColor on the Image which will show before the image loads, or behind the image if the image is transparent.
  }
});

export default React.memo(Card);
