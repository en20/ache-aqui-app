import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import BusinessList from '../../components/Home/BusinessList';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Slider />
      <Category />
      <BusinessList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que o ScrollView se ajuste ao conteúdo
    
  },
});
