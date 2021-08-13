import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Button} from 'react-native';
import firebase from '../database/firebase';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/button';




const StudentSchema =yup.object({
    usn: yup.string()
              .required()
              .min(10),
    name: yup.string()
             .required()
             .min(3),
    cgpa: yup.string()
             .required()
             .test('is-num-1-10', 'CGPA must be between 1-10', (val) => {
                 return parseInt(val) < 10 && parseInt(val) > 0;
             })
})




const CreateStudentScreen = (props) => {

    // const [student, setStudent] = useState({
    //     usn: '',
    //     name: '',
    //     cgpa: ''

    // });

    // const handleChangeText = (usn, value) => {
    //     setStudent({...student, [usn]: value })
    // };

     async function saveNewStudent (values){
        
        // values = { 
        //     usn: values.usn, 
        //     name: values.name, 
        //     cgpa: values.cgpa };
    
        try {
            const response = await fetch(
              'http://localhost:3000/students',{
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                 
                },
                body: JSON.stringify(
                    values
                ) 
                }
            );
            const json = response.json();
            console.log(json.students)
          } catch (error) {
            console.error(error);
          }
       
        
      }
           
        
    

   

    return(
        <View style={styles.container}>
            
            <Formik
                initialValues ={{usn: '', name: '', cgpa: ''}}
                validationSchema = {StudentSchema}
                onSubmit={ async (values) => {
                    saveNewStudent(values);
                    // console.log("hi sunith")
                    
                    
                }
                }
                
            >
                {(props)=> (
                
                  <ScrollView>
                      
                      <TextInput
                        style ={ styles.input}
                        placeholder = 'Enter USN'
                        onChangeText ={props.handleChange('usn')}
                        value={props.values.usn}
                        onBlur ={props.handleBlur('usn')}
                     />
                     <Text style= {styles.errorText}>{props.touched.usn && props.errors.usn}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Enter Name'
                        onChangeText ={props.handleChange('name')}
                        value={props.values.name}
                        onBlur ={props.handleBlur('name')}
                     />
                     <Text style= {styles.errorText}>{props.touched.name && props.errors.name}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Enter CGPA'
                        onChangeText ={props.handleChange('cgpa')}
                        value={props.values.cgpa}
                        keyboardType ="numeric"
                        onBlur ={props.handleBlur('cgpa')}
                     />
                     <Text style= {styles.errorText}>{props.touched.cgpa && props.errors.cgpa}</Text>
                     <FlatButton text= 'submit' onPress={props.handleSubmit}  />
                     
                  </ScrollView> 
                  
                )}
            </Formik>
            

            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:40
    },
    inputGroup:{
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    input: {
        borderWidth: 1,
        borderColor:'#ddd',
        padding: 10,
        borderRadius: 6,
    },
    errorText : {
        color: 'crimson',
        fontWeight: 'bold',
        // marginBottom: 10,
        // marginTop: 6,
        textAlign: 'center'
    }

})
    


export default CreateStudentScreen;