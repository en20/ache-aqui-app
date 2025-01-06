import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, 'Slider'));
    const querySnapShot = await getDocs(q);

    const sliders = [];
    querySnapShot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  };

  return (
    <View>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            padding: 20,
            paddingTop:20,
            marginBottom:5
        }}>Especial para você!</Text>
         <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        renderItem={({item, index})=> (
            <Image source={{uri:item.imageUrl}}
            style={{
                width:300,
                height:150,
                borderRadius:15,
                marginRight:15,
                objectFit:'fill'
            }}
            />
        )}
        />
        </View>
  );
  
}


