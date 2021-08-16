import React, {useEffect, useState} from 'react';
import { 
    View, 
    TextInput, 
    ScrollView, 
    StyleSheet,
    Button,
    Text,  
    ActivityIndicator,
    Alert,
    TouchableOpacity 
} from 'react-native';


const StudentDetailScreen = (props) => {

    const initialState = {
            id: '',
            usn: '',
            name: '',
            cgpa: '',
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

    const handleChangeText = (usn, value) => {
        setStudent({...student, [usn]: value })
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
                    usn : student.usn,
                    name : student.name,
                    cgpa: student.cgpa
                    
                }
                    
                )
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
                placeholder="USN" 
                value = {student.usn}
                maxLength={10}
                onChangeText={(value) => handleChangeText('usn', value) } 
            />
        </View>

       
        <View style = {styles.inputGroup}>
            <TextInput 
                placeholder="Name"
                value = {student.name}
                onChangeText={(value) => handleChangeText('name', value) } 
            />
        </View>
      
        <View style = {styles.inputGroup}>
            
            <TextInput 
                 placeholder="CGPA"
                 value = {student.cgpa}
                 keyboardType="numeric"
                 maxLength={3}
                 onChangeText={(value) => handleChangeText('cgpa', value) } 
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