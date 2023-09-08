/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
  Animated,
} from "react-native";
import moment from "moment";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { app } from "../firebase/config";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const firestore = getFirestore(app);

const Home = ({ navigation }: any) => {
  const [todos, setTodos] = useState([]);
  const [todoAnimations, setTodoAnimations] = useState({});

  const icon = <FontAwesome5 name={"times"} size={20} solid color="red" />;

  const addIcon = (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => navigation.push("AddNew")}
    >
      <FontAwesome5
        name={"plus-circle"}
        size={40}
        solid={false}
        color="#62D2C3"
        style={{ backgroundColor: "white" }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "todos"));
        const todosData = querySnapshot.docs.map((doc) => doc.data());
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
    console.log(todos);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "todos", id));
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const changeTodoStatus = async (todo) => {
    try {
      await updateDoc(doc(firestore, "todos", todo.id), {
        isDone: !todo.isDone,
      });
      //update also todo
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === todo.id
            ? { ...prevTodo, isDone: !prevTodo.isDone }
            : prevTodo
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  const linkToDetails = (todo: any) => {
    //link to TodoDetails
    navigation.push("TodoDetails", { todo });
  };

  const onSwipeLeft = (todo) => {
    const newAnimation = new Animated.Value(0);
    // Animate the swipe left action
    Animated.timing(newAnimation, {
      toValue: -100, // Adjust this value for desired swipe distance
      duration: 300, // Adjust this value for desired animation speed
      easing: Easing.linear, // Add an easing function if needed
      useNativeDriver: false, // Make suMake sure to set this to false when using layout animation
    }).start(() => {
      // After the animation is complete, change the todo status
      changeTodoStatus(todo);

      // Reset the animation value
      newAnimation.setValue(0);
    });
    setTodoAnimations({
      ...todoAnimations,
      [todo.id]: newAnimation,
    });
  };
  // const animatedStyle = {
  //   transform: [{ translateX: animation }],
  // };

  return (
    <View style={styles.homeWrapper}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Do more!</Text>
        <Image
          source={require("../assets/image-removebg-preview-10.png")}
          style={styles.image}
        />
      </View>
      <View
        // onPress={() => navigation.push("AddNew")}
        style={styles.addNew}
      >
        <View
          style={{
            position: "absolute",
            top: -30,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {addIcon}
        </View>
      </View>

      <ScrollView style={{ maxHeight: 300 }}>
        {todos &&
          todos.map((todo: any, index) => (
            <GestureRecognizer
              key={index}
              onSwipeLeft={() => onSwipeLeft(todo)}
              onSwipeRight={() => handleDelete(todo.id)}
              config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
              }}
              // style={styles.swipeContainer}
            >
              <Animated.View
                key={index}
                style={[
                  styles.todoWrapper,
                  todo.isDone
                    ? { backgroundColor: "#d1d1d1" }
                    : { backgroundColor: "white" },
                  {
                    transform: [
                      // Use the corresponding animation value for each todo item
                      {
                        translateX:
                          todoAnimations[todo.id] !== undefined
                            ? todoAnimations[todo.id]
                            : 0,
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.todoText}>{todo.title}</Text>
                <Text style={styles.todoText}>
                  {todo.doneUntil && moment(todo.doneUntil).format("DD M YYYY")}
                </Text>
                <Text
                  style={styles.todoText}
                  onPress={() => linkToDetails(todo)}
                  numberOfLines={1} // Set this to 1 line to truncate the text
                  ellipsizeMode="tail" // Set this to display an ellipsis at the end
                >
                  {todo.description.length > 20
                    ? todo.description.substring(0, 10) + "..." // Truncate text and add ellipsis
                    : todo.description}
                </Text>

                {/* <View style={styles.icons}>
                  <TouchableOpacity onPress={() => changeTodoStatus(todo)}>
                    {todo.isDone ? (
                      <EntypoIcon name="check" size={30} color="green" />
                    ) : (
                      <EntypoIcon name="check" size={30} color="gray" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(todo.id)}>
                    {icon}
                  </TouchableOpacity>
                </View> */}
              </Animated.View>
            </GestureRecognizer>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeWrapper: {
    height: "100%",
    position: "relative",
  },
  todoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 8,
    backgroundColor: "white",
    paddingVertical: 5, // Assigning a valid CSS dimension value
    paddingHorizontal: 20,

    borderBottomWidth: 2,
  },
  button: {
    color: "red",
  },
  headingWrapper: {
    height: 250,
    backgroundColor: "#62D2C3",
    marginBottom: 35,
  },

  heading: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 30,
    fontFamily: "Poppins-Semibold",
    color: "black", // This should match the font family name you used in react-native.config.js
  },
  image: { width: 100, height: 100, alignSelf: "center", marginTop: 20 },
  addNew: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    height: 40,
    alignItems: "center",
    zIndex: 100000,
  },
  addNewText: {
    margin: 5,
    fontFamily: "Poppins-Semibold",
    fontSize: 15,
    fontWeight: "bold",
    color: "#62D2C3",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  todoText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
