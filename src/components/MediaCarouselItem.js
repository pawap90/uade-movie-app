import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginRight: 16
    },
    title: {
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,.5)',
        color: '#FFFFFF',
        padding: 12
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    }
});

export default function MediaCarouselItem({ title, imageUrl, width, height }) {
    return (
        <View style={{...styles.container, width: width, height: height}}>
            <ImageBackground style={styles.image} source={{ uri: imageUrl }}>
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </View>
    );
}