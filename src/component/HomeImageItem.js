import React, { useState } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeImageItem (props) {
    const image=props.image
    return(

            <View style={styles.container}>
                <View style={{shadowColor: "#000000", shadowOpacity: 0.5, shadowOffset: { width: 2, height: 2 }}}>
                    <Image style={styles.item} source={require('../../assets/images/BookSample02.png')}/>
                </View>
                <Text style={styles.title}>{props.title}</Text>
            </View>
     

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    item : {
        marginBottom: 10,
        width: 90,
        height: 90,
        resizeMode: 'stretch',
    },
    title : {
        textAlign: 'center',
        fontSize: 13
    }
})

export default HomeImageItem;