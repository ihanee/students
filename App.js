import React from 'react';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




 const Stack = createNativeStackNavigator()

 const myOptions = {
   title: "HOME",
   headerTintColor: "white",
   headerStyle : {
   backgroundColor: "#001f3f",  
   }
 } 

import StudentsList from './screens/StudentsList';
import CreateStudentScreen from './screens/CreateStudentScreen.js';
import StudentDetailScreen from './screens/StudentDetailScreen';
import MapDetails from './screens/MapDetails';

function MyStack(){
  return(
    <Stack.Navigator >
      
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
          name= "MapDetails" 
          component={MapDetails} 
          options ={{...myOptions, title:"DETAILS"}} 
      />

      <Stack.Screen 
          name= "StudentDetailScreen" 
          component={StudentDetailScreen} 
          options ={{...myOptions, title:"EDIT"}} 
      />
    </Stack.Navigator>
  )
}


export default function App() {
  
  return (
    <NavigationContainer >
      <MyStack /> 
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'limegreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

