import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import firebase from '../database/firebase';
import {ListItem, Avatar, Divider} from 'react-native-elements';
import Card from '../components/card';




const StudentsList = (props) => {

    const [students, setStudents] = useState([]);

    useEffect(  () => {
        // firebase.db.collection('students').onSnapshot(querySnapshot => {
        //     const students = [];



        //     querySnapshot.docs.forEach(doc => {
        //         const {usn, name, cgpa} = doc.data()
        //         students.push({
        //             id: doc.id,
        //             usn,
        //             name,
        //             cgpa
                    
        //         })
        //     });
        //     setStudents(students)
        // });

      req()
      
        

    }, [])
     const req = async ()=> {
        try {
            const response = await fetch(
              'http://localhost:3000/students',{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                 
                }
                // body: JSON.stringify(
                //     values
                // ) 
                }
            );
            const json = response.json();
            setStudents(json.students)
            console.log(json.students)
            console.log("hi")
          } catch (error) {
            console.error(error);
          }

     }

    return (
       <ScrollView>
           
           <Button
                color= '#32CD32' 
                title="Create Student" 
                onPress= {() => props.navigation.navigate('CreateStudentScreen')} 
           />
          {/* {console.log(students)} */}
           {
              
               students.length>0 && 
               students.map(student => {
                   return(
                    <Card key ={student.id}>
                      <ListItem 
                      key = {student.id} 
                      
                      onPress={() => {props.navigation.navigate('StudentDetailScreen', {
                           studentId: student.id
                      })}}
                      >
                        
                            
                                <Avatar
                                    size="medium"
                                    rounded
                                    source={{
                                        uri:
                                        'https://www.kindpng.com/picc/m/33-338711_circle-user-icon-blue-hd-png-download.png',
                                    }}
                                    />
                            <ListItem.Content >
                            <ListItem.Title style={styles.name}>{student.name}</ListItem.Title>
                            <ListItem.Subtitle>{student.usn}</ListItem.Subtitle>
                            <ListItem.Subtitle>{student.cgpa}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                       
                        
                          
                        
                      </ListItem> 
                    </Card>
                      
                   )
               })
           }
         

       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:0,
        margin: 20,


    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    name :{
        fontSize: 19,
        // fontweight: "bold"

    }
})


export default StudentsList