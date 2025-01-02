import { View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: 85, // Define uma largura fixa para centralização
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.ICON_BG,
          borderRadius: 99,
          marginBottom: 8, // Espaço entre o ícone e o texto
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          width: '100%', // Garante que o texto ocupa a largura do container
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
