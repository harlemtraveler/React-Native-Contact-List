import React, { Component } from 'react';
import {
  View,
  Text,
  Linking,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import ContactListItem from '../components/ContactListItem';
import { MaterialIcons } from '@expo/vector-icons';
import getURLParams from '../utils/getURLParams';
import { fetchContacts } from '../utils/api';
import colors from '../utils/colors';
import store from '../store';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends Component {
  static navigationOptions = () => ({
    title: 'Contacts',
  });

  state = {
    // Initial fetch of State from Store
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    // Prep unsubscribe func
    this.unsubscribe = store.onChange(() => this.setState({
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      errors: store.getState().errors,
    }));

    // Fetch State from Store
    const contacts = await fetchContacts();

    // Update State
    store.setState({ contacts, isFetchingContacts: false });

    Linking.addEventListener('url', this.handleOpenUrl);

    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  }

  // Stop listening for changes from Store
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenUrl);
    this.unsubscribe();
  }

  handleOpenUrl(event) {
    const { navigation: { navigate } } = this.props;
    const { url } = event;
    const params = getURLParams(url);

    if (params.name) {
      const queriedContact = store
        .getState()
        .contacts
        .find(contact =>
          contact.name.split(' ')[0].toLowerCase() === params.name.toLowerCase());

      if (queriedContact) {
        navigate('Profile', { id: queriedContact.id });
      }
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
