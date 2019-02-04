import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-naive';

import { fetchContacts } from 'utils/api';
import ContactListItem from 'components/ContactListItem';

export default class Contacts extends Component {
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
    const { name, avatar, phone } = item;

    return <ContactListItem name={name} avatar={avatar} phone={phone} />;
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
