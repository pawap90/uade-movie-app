import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Tag(props) {
    const { text, backgroundColor, textColor } = props
    return (
        <Text style={{
            ...styles.container,
            backgroundColor: backgroundColor,
            color: textColor
        }}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: "bold"
    }
})