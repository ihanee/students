import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Modal } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Card from '../components/card';
import { AntDesign } from '@expo/vector-icons';
import CreateStudentScreen from './CreateStudentScreen';

const StudentsList = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    

    useEffect(  () => {
         req()
        

    },[students])
     const req = async ()=> {
        try {
            const response = await fetch(
              'http://10.0.2.2:3000/students',{
                method: "GET",
                
                }
            );
            const studentList = await response.json();
            setStudents(studentList)
            
          } catch (error) {
            console.error(error);
          }

     }

    return (
       <ScrollView>
          
         
            <Modal visible={modalOpen} animationType='slide'>
                
            <AntDesign 
               name="minuscircle" 
               size={44} 
               style={styles.modalClose}
               onPress = {() => setModalOpen(false)} 
            />
                    <CreateStudentScreen />
                
            </Modal>

            <AntDesign 
               name="pluscircle" 
               size={44} 
               style={styles.modalToggle}
               onPress = {() => setModalOpen(true)} 
            />

           {
               students.length>0 && 
               students.map(student => {
                   return(
                    <Card  key ={student.id}>
                      <ListItem 
                        key = {student.id} 
                        
                        onPress={() => {props.navigation.navigate('MapDetails', {
                            student: student
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
                            <ListItem.Subtitle>{student.phone}</ListItem.Subtitle>
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

    },
    modalToggle:{
        marginBottom: 2,
        marginTop: 2,
        padding: 10,
        alignSelf: "center",
        color: "green"
        
    },
    modalClose: {
        marginTop: 10,
        color: 'red',
        alignSelf:"center",
        padding: 10
    }
})

export default StudentsList;