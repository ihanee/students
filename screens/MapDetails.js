import React, {useEffect, useState} from 'react';
import { 
    View, 
    Button, 
    ScrollView, 
    StyleSheet,
    Text, 
    ActivityIndicator,
} from 'react-native';
import Card from '../shared/card';
import { Feather, Ionicons, FontAwesome, MaterialIcons, Fontisto,  MaterialCommunityIcons } from '@expo/vector-icons'; 


const MapDetails = (props) => {

    const initialState = {
            id: '',
            name: '',
            phone: '',
            address: '',
            city: '',
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

    return(
        <ScrollView  style= {styles.container}>
            <Card>
                <View>
                    <Text style={styles.view}><Ionicons name="person" size={24} color="blue" />  {student.name}</Text>
                    <Text style={styles.view}><Feather name="phone" size={24} color="blue" />  {student.phone}</Text>
                    <Text style={styles.view}><FontAwesome name="address-book" size={24} color="blue" />  {student.address}</Text>
                    <Text style={styles.view}><MaterialIcons name="location-city" size={24} color="blue" />  {student.city}</Text>
                    <Text style={styles.view}><MaterialCommunityIcons name="mailbox-up-outline" size={24} color="blue" />  {student.postcode}</Text>
                    <Text style={styles.view}><Fontisto name="world" size={24} color="blue" />  {student.country}</Text>
                    <Button 
                        type= "outline"
                        title ="Edit" 
                        onPress={() => {props.navigation.navigate('StudentDetailScreen', {
                            student: student  })}}
                />
                </View>
            </Card>
            
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
    view: {
        fontSize: 20,
        marginBottom:10,

    }
})

export default MapDetails;