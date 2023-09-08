/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import uuid from "react-native-uuid";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { validationSchema } from "../schemas/yupSchema";
import moment from "moment";

const firestore = getFirestore(app);

const AddNew = ({ navigation }: any) => {
  const [choosenDate, setChoosenDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const itemId = uuid.v1();
  const homeIcon = (
    <FontAwesome5 name={"home"} size={30} solid color="#62D2C3" />
  );
  const todoIcon = (
    <FontAwesome5 name={"tools"} size={40} solid color="white" />
  );
  const calendarIcon = (
    <FontAwesome5 name={"calendar-day"} size={30} solid color="#62D2C3" />
  );
  console.log(moment(choosenDate).valueOf());
  const addData = async (data: any) => {
    const convertedDate = moment(choosenDate);

    try {
      const docRef = await setDoc(doc(firestore, "todos", itemId), {
        id: itemId,
        isDone: false,
        doneUntil: moment(choosenDate).valueOf(),
        ...data,
      });

      console.log("Document written with ID: ", itemId);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || choosenDate;
    setShowDatePicker(Platform.OS === "ios");
    setChoosenDate(currentDate);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>{todoIcon}</Text>
      <Formik
        initialValues={{ title: "", description: "", date: choosenDate }}
        onSubmit={addData}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formWrapper}>
            <TextInput
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              placeholder="Title of action"
              value={values.title}
              style={styles.input}
            />
            {touched.title && errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="Description"
              value={values.description}
              style={styles.input}
            />
            <View style={styles.dateWrapper}>
              <TouchableOpacity onPress={showDatepicker}>
                {/* <Text style={styles.button}>Select Date</Text> */}
                {calendarIcon}
              </TouchableOpacity>
              {showDatePicker && (
                <RNDateTimePicker
                  value={values.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  // dateFormat="day month year"
                  style={styles.datePicker}
                />
              )}
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
  wrapper: {
    height: "100%",
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
  input: {
    height: 40,
    borderBottomWidth: 1,
    margin: 10,
    fontSize: 17,
  },
  dateWrapper: {
    display: "flex",
    flexDirection: "row",

    padding: 20,
    paddingLeft: 0,
    alignItems: "center",
    margin: 10,
  },
  formWrapper: {
    padding: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    padding: 10,
    backgroundColor: "#62D2C3",
    color: "white",
  },
  datePicker: {},
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default AddNew;
