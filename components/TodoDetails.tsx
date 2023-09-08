/* eslint-disable quotes */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
const TodoDetails = ({ navigation, route }: any) => {
  console.log(route.params);
  const todo = route.params.todo;
  const date = todo.doneUntil
    ? moment(todo.doneUntil).format("DD. MM. YYYY")
    : null;
  console.log(date);
  const homeIcon = (
    <FontAwesome5 name={"home"} size={30} solid color="#62D2C3" />
  );
  return (
    <View style={styles.detailsWrapper}>
      <View>
        <Text style={styles.heading}>Your task is:</Text>
        <View style={styles.object} />
        <View style={styles.object2} />
        <View style={styles.object3} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>{todo.description}</Text>
        {date && (
          <View style={styles.dateWrapper}>
            <Text style={{ fontFamily: "Roboto-Medium" }}>
              This task needs to be done until:
            </Text>
            <Text style={{ fontFamily: "Roboto-Medium" }}>{date}!</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.push("Home")}
        style={styles.addNew}
      >
        {/* <Text style={styles.addNewText}>Back to home</Text> */}
        {homeIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "relative",
  },

  heading: {
    marginTop: 20,
    height: 100,
    width: "100%",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#62D2C3",
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  textWrapper: {
    dispaly: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    height: "50%",
    position: "relative",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 28,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    textAlign: "justify",
  },
  addNew: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addNewText: {
    margin: 5,
    fontFamily: "Poppins-Semibold",
    fontSize: 15,
    fontWeight: "bold",
    color: "#62D2C3",
  },
  dateWrapper: {
    position: "absolute",
    bottom: 0, // Position it at the bottom of the flex container
    left: 0, // Position it at the left of the flex container
    right: 0, //
    display: "flex",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopColor: "gray",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
    paddingTop: 10,
  },
  object: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    left: -20,
    top: -10,
    backgroundColor: "white",
    opacity: 0.5,
  },
  object2: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 35,
    left: -20,
    top: 40,
    backgroundColor: "white",
    opacity: 0.2,
  },
  object3: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 35,
    right: 20,
    top: -10,
    backgroundColor: "white",
    opacity: 0.2,
  },
});
export default TodoDetails;
