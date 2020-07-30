import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AppTabs = props => {
    return(
    <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={()=>{alert('You are on Home screen')}}>
            <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{alert('You are on Chat Now screen')}}>
            <Text style={styles.text}>Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{alert('You are on Map screen')}}>
            <Text style={styles.text}>Map</Text>
        </TouchableOpacity>
    </View>

    )};

const styles = StyleSheet.create({
    tabsContainer: {
        
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 25,
        
    },
    text: {
        padding: 3,
        width: 120,
        backgroundColor: 'lightgray',
        borderRadius: 15,
        textAlign: 'center',
        height: 35,
        fontSize: 20,
    }

});

export default AppTabs;

