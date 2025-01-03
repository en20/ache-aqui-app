import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { db, storage } from "./../../config/FirebaseConfig";
import { query, collection, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);

    const categoriesData = [];
    snapShot.forEach((doc) => {
      categoriesData.push({
        label: doc.data().name,
        value: doc.data().name,
      });
    });
    setCategoryList(categoriesData);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    try {
      if (!image) {
        console.log("No image selected");
        setLoading(false);
        return;
      }

      const fileName = `${Date.now().toString()}.jpg`;
      const resp = await fetch(image);
      const blob = await resp.blob();
      const imageRef = ref(storage, `app1/${fileName}`);

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      await saveBusinessDetail(downloadURL);

      // Mensagem de sucesso
      Alert.alert(
        "Sucesso",
        "Negócio adicionado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Opcional: Voltar para a tela anterior
          },
        ]
      );

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    try {
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name: name,
        adress: adress,
        contact: contact,
        website: website,
        about: about,
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: imageUrl,
      });
      console.log("Business details saved");
    } catch (error) {
      console.error("Error saving business details:", error);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        style={{ marginTop: 20, width: 100, height: 100 }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          placeholderTextColor={"#000"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setAdress(v)}
          placeholder="Address"
          placeholderTextColor={"#000"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          placeholderTextColor={"#000"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          placeholderTextColor={"#000"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          placeholder="About"
          placeholderTextColor={"#000"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            marginTop: 10,
            height: 100,
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
          }}
          onPress={() => setPickerVisible(true)}
        >
          <Text
            style={{
              fontSize: 17,
              color: selectedCategory ? Colors.PRIMARY : "black",
            }}
          >
            {selectedCategory
              ? categoryList.find((c) => c.value === selectedCategory)?.label
              : "Select a category"}
          </Text>
        </TouchableOpacity>
        <Modal visible={isPickerVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <FlatList
                  data={categoryList}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.GRAY,
                      }}
                      onPress={() => {
                        setSelectedCategory(item.value);
                        setCategory(item.value);
                        setPickerVisible(false);
                      }}
                    >
                      <Text style={{ fontSize: 17 }}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setPickerVisible(false)}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{ textAlign: "center", color: "#fff", fontSize: 16 }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color="#fff" />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          height: 500,
        }}
      ></View>
    </ScrollView>
  );
}
