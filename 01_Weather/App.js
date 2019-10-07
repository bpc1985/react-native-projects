import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  View
} from 'react-native';
import SearchInput from './SearchInput';
import { getImageForWeather } from './api/weatherImage';
import { fetchWeather } from './api/api';

const initialState = {
  loading: false,
  error: false,
  location: 'Helsinki',
  temperature: 0,
  weather: ''
};

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    handleWeatherData();
  }, [state.location]);

  const handleWeatherData = async () => {
    try {
      setState({...state, loading: true});
      const { location, weather, temperature } = await fetchWeather(state.location);
      setState({
        loading: false,
        error: false,
        location,
        weather,
        temperature
      });
    } catch (e) {
      console.log('Error handleWeatherData: ', e);
      setState({...state, loading: false, error: true});
    }
  }

  // Update location
  const handleUpdateLocation = async (city) => {
    if (city) {
      setState({...state, location: city});
    }
  }

  const { loading, error, location, weather, temperature } = state;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather data, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search your city"
                onSubmit={handleUpdateLocation} />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "AvenirNext-Regular"
    //   },
    //   android: {
    //     fontFamily: "Roboto"
    //   }
    // })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
