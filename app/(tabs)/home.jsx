import React from 'react';
import {View, StyleSheet } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider/>
      <Category/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container fill the screen
  },
});
