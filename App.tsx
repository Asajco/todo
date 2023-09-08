/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import AddNew from "./components/AddNew";
import TodoDetails from "./components/TodoDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // This hides the header for this screen
          }}
        />
        <Stack.Screen
          name="AddNew"
          component={AddNew}
          options={{
            headerShown: false, // This hides the header for this screen
          }}
        />
        <Stack.Screen
          name="TodoDetails"
          component={TodoDetails}
          options={{
            headerShown: false, // This hides the header for this screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
