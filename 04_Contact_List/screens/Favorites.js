import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchContacts } from "../utils/api";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";

const initState = { contacts: [], loading: true, error: false };

export default function Favorites(props) {
  const [state, setState] = useState(initState);

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

  const renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate }
    } = props;
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  const keyExtractor = ({ phone }) => phone;

  const { loading, contacts, error } = state;
  const favorites = contacts.filter(contact => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
}

Favorites.navigationOptions = ({ navigation }) => ({
  title: "Favorites",
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
  },
  list: {
    alignItems: "center"
  }
});
