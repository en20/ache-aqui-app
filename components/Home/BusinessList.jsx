import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import BusinessCard from './BusinessCard';

export default function BusinessList() {
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        GetBusinessList();
    }, []);

    const GetBusinessList = async () => {
        try {
            setBusinessList([]);

            const q = query(collection(db, 'BusinessList'));
            const querySnapShot = await getDocs(q);

            const business = [];
            querySnapShot.forEach((doc) => {
                console.log("Documento encontrado:", doc.data());
                business.push({id:doc.id,...doc.data()});
            });

            setBusinessList(business);
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
        }
    };

    return (
        <View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                padding: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold'
                }}>Popular Business</Text>
                <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium' }}>View All</Text>
            </View>
            <FlatList
                data={businessList}
                horizontal={true}
                style={{ marginLeft: 10 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <BusinessCard business={item} />
                )}
            />
        </View>
    );
}
