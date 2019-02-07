import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../utils/colors';
import DetailListItem from '../components/DetailListItem';

export default class Options extends Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Options',
    headerLeft: (
      <MaterialIcons
        name='close'
        size={24}
        tsyle={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <DetailListItem title='Update Profile' />
        <DetailListItem title='Change Language' />
        <DetailListItem title='Sign Out' />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
