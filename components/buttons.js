import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton({ text, onPress}) {
    return (
        <TouchableOpacity onPress ={onPress}>
            <View style ={styles.buttonContainer}>
               <Text style = {styles.button}>{text}</Text> 
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create ({
        buttonContainer: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#f01d71',
        width: 300,
        marginBottom: 10,
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-between',
        
    },
    button: {
        width: 100,
        color:'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})