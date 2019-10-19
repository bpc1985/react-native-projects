import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";
import colors from "../utils/colors";

initialState = {
  contacts: [],
  loading: true,
  error: false
};

export default function Contacts(props) {
  const [state, setState] = useState(initialState);

  const getContacts = async () => {
    try {
      const contacts = await fetchContacts();
      setState({ contacts, loading: false, error: false });
    } catch (e) {
      setState({ ...state, loading: false, error: true });
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const renderContact = ({ item }) => {
    const {
      navigation: { navigate }
    } = props;
    const { id, name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  const keyExtractor = ({ phone }) => phone;

  const { loading, contacts, error } = state;

  const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
}

Contacts.navigationOptions = ({ navigation }) => ({
  title: "Contacts",
  headerLeft: (
    <MaterialIcons
      name="menu"
      size={24}
      style={{ color: colors.black, marginLeft: 10 }}
      onPress={() => navigation.toggleDrawer()}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});
