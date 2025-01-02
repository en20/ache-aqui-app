import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'
import React from 'react'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
    const router=useRouter();
  return (
    <TouchableOpacity 
    style={{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor: '#fff'
    }}
    onPress={()=> router.push('/businessdetail/'+business.id)}
    >
      <Image 
                source={{ uri: business.imageUrl }} 
                style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                resizeMode="cover"
            />
            <View style={{ marginBottom: 5 }}>
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'outfit-bold'
                }} numberOfLines={1}>{business.name}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{
                    fontSize: 14,
                    fontFamily: 'outfit-regular'
                }} numberOfLines={1}>{business.adress}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log(`Visitando site: ${business.website}`)}>
                <View style={{ width: '100%' }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-medium',
                        textDecorationLine: 'underline',
                    }}>Visit Website</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5,
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <Image source={require('../../assets/images/star.png')} style={{
                        width: 30,
                        height: 30
                    }}/>
                    <Text style={{
                        fontFamily: 'outfit',
                    }}>4.5</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 14,
                        color: '#fff',
                        padding: 3,
                        borderRadius: 5,
                        backgroundColor: Colors.PRIMARY,
                        fontFamily: 'outfit-medium',
                    }} numberOfLines={1}>{business.category}</Text>
                </View>
            </View>
    </TouchableOpacity>
  )
}