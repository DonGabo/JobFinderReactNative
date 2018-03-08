import React from 'react';
import { View, ScrollView, Text, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapView } from 'expo';

class ReviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    },
    headerRight: (
      <Button
        title="Settings"
        onPress={(() => { navigation.navigate('settings'); })}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    // headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 },
  });

  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const {
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle,
        jobkey,
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply NOW!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <View>
        <ScrollView>
          { this.renderLikedJobs() }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  italics: {
    fontStyle: 'italic',
  },
};

ReviewScreen.propTypes = {
  likedJobs: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    likedJobs: state.likedJobs,
  };
}

export default connect(mapStateToProps)(ReviewScreen);
