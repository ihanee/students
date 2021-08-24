import React from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/button';

const StudentSchema =yup.object({
    name: yup.string()
              .required()
              .min(3),
    phone: yup.string()
             .required()
             .max(10),
    address: yup.string()
             .required()
             .min(10),
    city: yup.string()
             .required(),
    postcode: yup.string()
             .required()
             .max(6),
    country: yup.string()
             .required(),
})

const CreateStudentScreen = (props) => {

    async function saveNewStudent (values){
        
        try {
            const req = await fetch(
               'http://10.0.2.2:3000/students',{
                method: 'POST',
                headers: {
                     
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( values)

                }
            );
           
            
          } catch (error) {
            console.error(error);
          }
          props.navigation.navigate('StudentsList')
        }
    return(
        <View style={styles.container}>
            
            <Formik
                initialValues ={{name: '', phone: '', address: '', city: '', postcode:'', country:''}}
                validationSchema = {StudentSchema}
                onSubmit={ async (values) => {
                    saveNewStudent(values);
                }
                }
            >
                {(props)=> (
                
                  <ScrollView>
                      
                      <TextInput
                        style ={ styles.input}
                        placeholder = 'Name'
                        onChangeText ={props.handleChange('name')}
                        value={props.values.name}
                        onBlur ={props.handleBlur('name')}
                     />
                     <Text style= {styles.errorText}>{props.touched.name && props.errors.name}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Phone'
                        onChangeText ={props.handleChange('phone')}
                        value={props.values.phone}
                        keyboardType ="numeric"
                        onBlur ={props.handleBlur('phone')}
                     />
                     <Text style= {styles.errorText}>{props.touched.phone && props.errors.phone}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Address'
                        onChangeText ={props.handleChange('address')}
                        value={props.values.address}
                        multiline
                        onBlur ={props.handleBlur('address')}
                     />
                     <Text style= {styles.errorText}>{props.touched.address && props.errors.address}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'City'
                        onChangeText ={props.handleChange('city')}
                        value={props.values.city}
                        onBlur ={props.handleBlur('city')}
                     />
                     <Text style= {styles.errorText}>{props.touched.city && props.errors.city}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Postcode'
                        onChangeText ={props.handleChange('postcode')}
                        value={props.values.postcode}
                        multiline
                        onBlur ={props.handleBlur('postcode')}
                     />
                     <Text style= {styles.errorText}>{props.touched.postcode && props.errors.postcode}</Text>
                     <TextInput
                        style ={ styles.input}
                        placeholder = 'Country'
                        onChangeText ={props.handleChange('country')}
                        value={props.values.country}
                        multiline
                        onBlur ={props.handleBlur('country')}
                     />
                     <Text style= {styles.errorText}>{props.touched.country && props.errors.country}</Text>
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
        backgroundColor: "#fff",
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