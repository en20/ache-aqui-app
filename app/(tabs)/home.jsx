import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Home/Header';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container fill the screen
  },
});
