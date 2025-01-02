import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native';
import React from 'react';

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: 'Call',
      icon: require('./../../assets/images/call.png'),
      url: 'tel:' + business?.contact,
    },
    {
      id: 2,
      name: 'Location',
      icon: require('./../../assets/images/pin.png'),
      url: 'https://www.google.com/maps/search/?api=1&query=' + business?.adress,
    },
    {
      id: 3,
      name: 'Web',
      icon: require('./../../assets/images/web.png'),
      url: business?.website,
    },
    {
      id: 4,
      name: 'Share',
      icon: require('./../../assets/images/share.png'),
      url: business?.website,
    },
  ];
  const OnPressHandle = async (item) => {
    try {
      if (item.name === 'Share') {
        const message = `${business?.name}\nEndereço: ${business?.adress}\nFind more details on Ache Aqui App!`;
        await Share.share({ message });
      } else {
        const supported = await Linking.canOpenURL(item.url);
        if (supported) {
          await Linking.openURL(item.url);
        } else {
          alert('Não foi possível abrir este link: ' + item.url);
        }
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };
  
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
      }}
    >
      <FlatList
        style={{

        }}
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => OnPressHandle(item)}>
            <Image source={item?.icon}
            style={{
                width:50,
                height:50
            }} />
            <Text style={{
                fontFamily: 'outfit-medium',
                textAlign: 'center',
                marginTop:3,
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
