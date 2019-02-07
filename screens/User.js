import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';
import { MaterialIcons } from '@expo/vector-icons';
import ContactThumbnail from '../components/ContactThumbnail';

export default class User extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Me',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerLeft: (
      <MaterialIcons
        name='menu'
        size={24}
        style={{ color: 'white', marginLeft: 10 }}
        onPress={() => navigate('DrawerToggle')}
      />
    ),
    headerRight: (
      <MaterialIcons
        name='settings'
        size={24}
        style={{ color: 'white', marginRight: 10 }}
        onPress={() => navigate('Options')}
      />
    ),
  });

  state = {
    user: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const user = await fetchUserContact();

      this.setState({
        user,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { user, loading, error } = this.state;
    const { name, avatar, phone } = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size='large' />}
        {error && <Text>Error...</Text>}

        {!loading && (
          <ContactThumbnail
            name={name}
            avatar={avatar}
            phone={phone}
          />
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});
