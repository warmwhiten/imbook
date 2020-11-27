import React, { useState } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Image, StyleSheet, Text } from 'react-native';


function HomeImageItem () {
    return(
        <View style={styles.container}>
            <Image style={styles.item} source={require('../../assets/images/BookSample01.jpg')}/>
            <Text style={styles.title}>냐냐</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding : 10,
    },
    item : {
        width: 100,
        height: 200,
        resizeMode: 'center',
    },
    title : {
        textAlign: 'center',
    }
})

export default HomeImageItem;