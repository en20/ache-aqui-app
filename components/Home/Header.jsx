import { View, Text, Image} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from 'react-native-web';

export default function Header() {

    const {user}=useUser()
  return (
    <View style={{
        padding:20,
        paddingTop:20,
        backgroundColor:Colors.PRIMARY
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems:'center',
            gap:10
        }}>
                <Image source={{uri:user?.imageUrl}}
                style={{
                    width:45,
                    height:45,
                    borderRadius:99
                }}/>
            <View>
                <Text style={{
                    fontSize:19,
                    color:'#fff'
                }}>Welcome,</Text>
                <Text style={{
                    fontSize:19,
                     color:'#fff',
                    fontFamily:'outfit-medium'
                }}>{user?.fullName}</Text>
            </View>
        </View>
        
    </View>
  )
}