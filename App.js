import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from "react-native";
import Header from './components/Header';
// import _ from "lodash";
// LogBox.ignoreLogs(["1"]);
// const _console = _.clone(console);
// console.warn = (message) => {
// if (message.indexOf("1") <= -1) {
// _console.warn(message);
// }
// };

 const Stack = createNativeStackNavigator()

 const myOptions = {
   title: "HOME",
   headerTintColor: "black",
   headerStyle : {
    backgroundColor: "white"
    
   }
  
 }
 
 

import StudentsList from './screens/StudentsList';
import CreateStudentScreen from './screens/CreateStudentScreen.js';
import StudentDetailScreen from './screens/StudentDetailScreen';



function MyStack(){
  return(
    <Stack.Navigator h>
      
      <Stack.Screen 
          name= "StudentsList" 
          component={StudentsList} 
          options ={myOptions} 
      />
      <Stack.Screen 
          name= "CreateStudentScreen" 
          component={CreateStudentScreen} 
          options ={{...myOptions, title:"CREATE"}} 
      />

      
      <Stack.Screen 
          name= "StudentDetailScreen" 
          component={StudentDetailScreen} 
          options ={{...myOptions, title:"DETAILS"}} 
      />
    </Stack.Navigator>
  )
}


export default function App() {
  
  return (
    <NavigationContainer>
      
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

