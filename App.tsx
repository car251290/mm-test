import { useCallback, useEffect, useState, default as React } from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import Constants from "expo-constants";

//to the navigation page
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// or any pure javascript modules available in npm
import { Card, Button } from "react-native-paper";

// The endpoint from which we will fetch the featured items
const ENDPOINT = "https://my-momentum-staging.herokuapp.com/api/features/";

export default function App() {
  // Where we will store the featured items
  const [items, setItems] = useState<any[]>([]);

  // The function we will use to load the items
  const loadItems = useCallback(async () => {
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    setItems(json);
  }, [setItems]);

  // Load the items once when component mounts
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover
          style={{ height: 200, width: 300, alignItems: "center" }}
          source={{
            uri: "https://my-momentum-staging.herokuapp.com/api/features/",
          }}
        />
        {items.map((item) => (
          <Text>{item.title}</Text>
        ))}
        <Card.Cover
          style={{ height: 200, width: 300, alignItems: "center" }}
          source={{
            uri: "https://my-momentum-staging.herokuapp.com/api/features/",
          }}
        />
        {items.map((item) => (
          <Text>{item.title}</Text>
        ))}
        <Card.Cover
          style={{ height: 200, width: 300, alignItems: "center" }}
          source={{
            uri: "https://my-momentum-staging.herokuapp.com/api/features/",
          }}
        />
        {items.map((item) => (
          <Text>{item.title}</Text>
        ))}
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "orange",
  },
});
