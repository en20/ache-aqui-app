import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard1';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        getBusinessList();
    }, [category]);

    const getBusinessList = async () => {
        setLoading(true); // Inicia o estado de loading
        try {
            const q = query(collection(db, 'BusinessList'), where('category', '==', category));
            const querySnapShot = await getDocs(q);

            querySnapShot.forEach((doc)=>{
                console.log(doc.data())
                setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
            });
        } catch (error) {
            console.error('Error fetching business list:', error);
        } finally {
            setLoading(false); // Finaliza o estado de loading
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={Colors.PRIMARY}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                />
            ) : businessList?.length > 0 ? (
                <FlatList
                    contentContainerStyle={{ padding: 16 }}
                    data={businessList}
                    renderItem={({ item }) => <BusinessListCard business={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                        color: Colors.GRAY,
                        textAlign: 'center',
                        marginTop: '50%',
                    }}
                >
                    No business Found
                </Text>
            )}
        </View>
    );
}
