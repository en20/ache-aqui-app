import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import useWarmUpBrowser from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/image.jpg")}
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>
          Ache aqui
          <Text style={styles.highlightText}> App </Text>
        </Text>
        <Text style={styles.descriptionText}>
          Ache pequenos negócios com preços acessíveis perto de você, e cadastre
          o seu negócio também!
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={onPress}>
          Login / Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  highlightText: {
    color: Colors.PRIMARY,
    fontSize: 30,
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 15,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});
