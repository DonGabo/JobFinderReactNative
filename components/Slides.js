import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          containerViewStyle={styles.button}
          title="Onwards!"
          raised
          onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => (
      <View
        style={[styles.slide, { backgroundColor: slide.color }]}
        key={slide.text}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }
  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    backgroundColor: '#0288D1',
    marginTop: 15,
  },
};

Slides.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Slides;
