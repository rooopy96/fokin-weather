import React from 'react';
import Loading from "./Loading"
import { Alert } from "react-native"
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.setState({ isLoading: false });
    } catch {
      Alert.alert("Can't fint you", "So sad :(")
    }
  }

  componentDidMount() {
    this.getLocation();
  }
  
  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading /> : null;
    );
  }
}