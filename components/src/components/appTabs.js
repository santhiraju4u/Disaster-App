import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AppTabs = props => {
    return(
    <View style={styles.tabsContainer}>
        <View>
            <Text style={styles.text}>Home</Text>
        </View>
        <View>
            <Text style={styles.text}>Chat Now</Text>
        </View>
        <View>
            <Text style={styles.text}>Map</Text>
        </View>
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

