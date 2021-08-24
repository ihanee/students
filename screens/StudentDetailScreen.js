import React, {useEffect, useState} from 'react';
import { 
    View, 
    TextInput, 
    ScrollView, 
    StyleSheet,
    Button, 
    ActivityIndicator,
} from 'react-native';


const StudentDetailScreen = (props) => {

    const initialState = {
            id: '',
            name: '',
            phone: '',
            address: '',
            city:'',
            postcode: '',
            country: ''
    }
    const [student, setStudent] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const getStudentById =async (student) => {
    
       setStudent({
           ...student,
           id: student.id
       });
       setLoading(false)
    };

    useEffect(() => {
        getStudentById(props.route.params.student);
    }, []);

    const handleChangeText = (name, value) => {
        setStudent({...student, [name]: value })
    };

    const deleteStudent = async () =>  {
        try {
            const response = await fetch(
              `http://10.0.2.2:3000/students/${student.id}`,{
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                },
                
                }
            );
            
            
          } catch (error) {
            console.error(error);
          }
        props.navigation.navigate('StudentsList')
    };

    const updateStudent = async () => {
       
        try {
            const response = await fetch(
                `http://10.0.2.2:3000/students/${student.id}`,{
                    method: "PUT",
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name : student.name,
                        phone : student.phone,
                        address: student.address,
                        city: student.city,
                        postcode:student.postcode,
                        country: student.country   
                    })
                }
            );
           
          } catch (error) {
            console.error(error);
          }
        props.navigation.navigate('StudentsList')
    }

    const openConfirmationAlert = () => {
        deleteStudent()
    };

    if (loading) {
        return(
            <View>
                <ActivityIndicator size ="large" color= "#9e9e9e" />
            </View>
        );

    }
    
    return(
        <ScrollView  style= {styles.container}>
       
        <View style = {styles.inputGroup}>
            
            <TextInput 
                placeholder="Name" 
                value = {student.name}
                onChangeText={(value) => handleChangeText('name', value) } 
            />
        </View>

       
        <View style = {styles.inputGroup}>
            <TextInput 
                placeholder="Phone"
                value = {student.phone}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(value) => handleChangeText('phone', value) } 
            />
        </View>
      
        <View style = {styles.inputGroup}>
            
            <TextInput 
                 placeholder="Address"
                 value = {student.address}
                 multiline
                 onChangeText={(value) => handleChangeText('address', value) } 
            />
        </View>
        <View style = {styles.inputGroup}>
            
            <TextInput 
                 placeholder="City"
                 value = {student.city}
                 onChangeText={(value) => handleChangeText('city', value) } 
            />
        </View>
        <View style = {styles.inputGroup}>
            
            <TextInput 
                 placeholder="postcode"
                 value = {student.postcode}
                 multiline
                 onChangeText={(value) => handleChangeText('postcode', value) } 
            />
        </View>
        <View style = {styles.inputGroup}>
            
            <TextInput 
                 placeholder="country"
                 value = {student.country}
                 multiline
                 onChangeText={(value) => handleChangeText('country', value) } 
            />
        </View>
                <  View style ={styles.buttonContainer}>
                   <View style={styles.button}>
                       <Button title="Update" color= "#32CD32" onPress= {() => updateStudent() }/>
                    </View> 
                   <View style={styles.button}>
                       <Button title="Delete" color= "#FF1F17" onPress= {() => openConfirmationAlert() } />
                    </View>
                </View>        
  </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 35
    },
    inputGroup:{
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor:'#ddd',
        padding: 10,
        marginBottom: 20,
        borderRadius: 6,
        
    },
    inputContainer: {
        width: 500,
        maxWidth: '100%',
        
    },
    buttonContainer: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        
    },
    button: {
        width: 100
    }
})

export default StudentDetailScreen;