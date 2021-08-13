import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import colors from '../Constants/colors';

const Header = props => {
    return (
        <View style = {styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 75,
        paddingTop: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center' 

    },
    headerTitle:{
        color: 'black',
        fontSize: 20,
        fontStyle: "normal",
        fontWeight:"bold"

    }

})

export default Header;