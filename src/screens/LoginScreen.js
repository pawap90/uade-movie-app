import React from 'react'
import { View, Text } from "react-native";
import BaseStyles from '../BaseStyles';

export default function LoginScreen() {
    return(
        <View style={BaseStyles.container}>
            <Text style={{color: '#FFFFFF'}}>This is the login</Text>
        </View>
    )
}