import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import ContactListItem from '../components/ContactListItem';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchContacts } from '../utils/api';
import colors from '../utils/colors';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  // static navigationOptions = ({ navigation: { navigate } }) => ({
  //   title: 'Contacts',
  //   headerLeft: (
  //     <MaterialIcons
  //       name='menu'
  //       size={24}
  //       style={{ color: colors.black, marginLeft: 10 }}
  //       onPress={() => navigate('DrawerToggle')}
  //     />
  //   ),
  // });

  state = {
    contacts: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();

      this.setState({
        contacts,
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

  renderContact = ({ item }) => {
    // Required for navigation to work
    const { navigation: { navigate } } = this.props;
    const { id, name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { contact: item })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size='large' />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
          />
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});
