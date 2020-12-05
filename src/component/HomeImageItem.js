import React, { useState } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeImageItem (props) {
    const image=props.image
    return(

            <View style={styles.container}>
                <Image style={styles.item} source={require('../../assets/images/BookSample01.jpg')}/>
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
        width: 80,
        height: 110,
        resizeMode: 'stretch',
    },
    title : {
        textAlign: 'center',
        fontSize: 13
    }
})

export default HomeImageItem;