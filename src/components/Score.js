import React from 'react';
import { View } from 'react-native';

export default function Score(props) {
    const { score } = props

    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
})