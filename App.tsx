import { useCallback, useEffect, useState, default as React } from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import Constants from "expo-constants";

//to the navigation page
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// or any pure javascript modules available in npm
import { Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";

// The endpoint from which we will fetch the featured items
const ENDPOINT = "https://my-momentum-staging.herokuapp.com/api/features/";


// In TypeScript, you define your component props in an Interface like this.
interface FeatureProps {
  feature: any,
  selected: number,
  select: Function,
}


/**
 * I've isolated the Feature component, because as you keep working
 * you'll see that it's really easy to build bloated components. Keeping
 * them lean like this makes it easy to keep track of what's happening where.
 */
const Feature = ({
  feature,
  select,
  selected
}: FeatureProps) => {
  console.log('@@ feature: ', feature);
  return (
    <Card
      key={feature.id}
      elevation={10}
      style={styles.card}
      onPress={() => {
        console.log('@@ pressed: ', feature.id);
        select(feature.id);
      }}
    >
      <Card.Cover
        source={{
          uri: feature.public_image,
        }}
      />
      <Card.Content>
        <Title>{feature.title}</Title>
        {selected === feature.id && (
          <Paragraph>{feature.short_description}</Paragraph>
        )}
      </Card.Content>
    </Card>
  )
};

export default function App() {
  // Where we will store the featured items
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState(-1);

  const select = useCallback((id: number) => {
    if(id === selected){
      setSelected(-1);
    }
    else {
      setSelected(id);
    }
  }, [setSelected, selected]);

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

  // You were looping over the text, like in the example I sent you, 
  // but to create the list of cards, you needed to add your <Card /> 
  // component _inside_ the items.map, which is why you weren't able to 
  // access the attributes you needed to display the images, etc.
  return (
    <ScrollView style={styles.container}>
      {items.map((feature) => (
        <Feature
          feature={feature}
          select={select}
          selected={selected}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'visible',
  },
  card: {
    marginBottom: 20,
    margin: 10,
  }
});
