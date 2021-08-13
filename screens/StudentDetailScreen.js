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
import firebase from '../database/firebase';
import FlatButton from '../components/buttons';


const StudentDetailScreen = (props) => {

    const initialState = {
            id: '',
            usn: '',
            name: '',
            cgpa: '',
    }
    const [student, setStudent] = useState(initialState);
    const [loading, setLoading] = useState(true);



    const getStudentById =async (id) => {
       const dbRef = firebase.db.collection('students').doc(id)
       const doc = await dbRef.get();
       const student = doc.data();
       setStudent({
           ...student,
           id: doc.id
       });
       setLoading(false)
    };

    useEffect(() => {
        getStudentById(props.route.params.studentId);
    }, []);

    const handleChangeText = (usn, value) => {
        setStudent({...student, [usn]: value })
    };

    const deleteStudent = async () =>  {
        const dbRef = firebase.db.collection('students').doc(props.route.params.studentId);
        await dbRef.delete();
        props.navigation.navigate('StudentsList')
    };

    const updateStudent = async () => {
       
            const dbRef =firebase.db.collection('students').doc(student.id);
            await dbRef.set({
                usn: student.usn,
                name: student.name,
                cgpa: student.cgpa
            })
          
        setStudent(initialState)
        props.navigation.navigate('StudentsList')
    }

    

    const openConfirmationAlert = () => {
        Alert.alert('Remove The Student', "Are you Sure?",[
            {text: 'Yes', onPress: () => deleteStudent()},
            {text: 'No', onPress: () => console.log(false)}

        ])
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