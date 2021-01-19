import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "5f49b19b52e4aa8e25d176e9714fe552";

export default class extends React.Component {
  state  = {
    isLoading : true
  }
  getWeather = async (latitude, longitude) => {
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data);
  }
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords : { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false })
    } catch (error) {
      Alert.alert("Can't find you.","So sad");
    } 
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}