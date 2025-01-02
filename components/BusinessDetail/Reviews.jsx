import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../config/FirebaseConfig";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
  const [reviews, setReviews] = useState(business?.reviews || []);
  const { user } = useUser();

  const onSubmit = async () => {
    try {
      const newReview = {
        rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      };

      const docRef = doc(db, "BusinessList", business?.id);
      await updateDoc(docRef, {
        reviews: arrayUnion(newReview),
      });

      setReviews((prevReviews) => [...prevReviews, newReview]);
      setUserInput(""); // Limpa o campo de texto após o envio
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>

      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          numberOfLines={4}
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
          placeholder="Write Your comment"
          placeholderTextColor={Colors.GRAY}
          style={styles.textInput}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={[
            styles.submitButton,
            { opacity: userInput ? 1 : 0.5 },
          ]}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsContainer}>
        {reviews.map((item, index) => (
          <View key={index} style={styles.reviewCard}>
            <Image
              source={{ uri: item.userImage }}
              style={styles.userImage}
            />
            <View style={styles.reviewContent}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.userEmail}>{item.userEmail}</Text>
              <Rating
                readonly
                startingValue={item.rating}
                imageSize={20}
                style={styles.rating}
              />
              <Text style={styles.userComment}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    paddingBottom: 60,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    textAlignVertical: "top",
  },
  submitButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: "outfit",
    color: "#fff",
    textAlign: "center",
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewCard: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  userName: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  userEmail: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
  rating: {
    marginVertical: 5,
  },
  userComment: {
    fontFamily: "outfit",
    fontSize: 14,
    marginTop: 5,
  },
});
