import React from 'react';
import Loading from "./Loading"
import { Alert } from "react-native"
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEYS = "43fcd5007123eb610754f835fea97a2c";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async(lat, lon) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch {
      Alert.alert("Can't fint you", "So sad :(")
    }
  }

  componentDidMount() {
    this.getLocation();
  }
  
  render() {
    const { isLoading, temp } = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)}/>
    );
  }
}