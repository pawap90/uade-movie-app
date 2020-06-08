import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,.5)',
        color: '#FFFFFF',
        padding: 12
    },
    image: {
        flex: 1,
        marginRight: 16,
        resizeMode: "cover",
        justifyContent: "flex-end",
    }
});

export default function MediaCarouselItem(props) {
    const { id, title, imageUrl, width, height, navigation } = props

    const goToDetails = () => {
        navigation.push('MediaDetails', { id: id })
    }

    return (
        <TouchableWithoutFeedback onPress={goToDetails}>
            <ImageBackground style={{ ...styles.image, width: width, height: height }} source={{ uri: imageUrl }}>
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}