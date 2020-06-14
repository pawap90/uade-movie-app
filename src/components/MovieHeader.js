import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Tag from '../components/Tag'
import Score from '../components/Score'
import DateHelper from '../helper/dateHelper';
import ButtonWithIcon from './ButtonWithIcon';
import plusIcon from '../../assets/plus.png';

export default function MovieHeader(props) {

    const { title, releaseDate, summary, genres, languages } = props

    return (
        <View style={styles.container}>
            <View style={styles.genres}>
                {genres?.map((genre, i) => (
                    <Tag text={genre} backgroundColor="#F08EA0" textColor="#34424F"/>
                ))}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.releaseDate}>{DateHelper.format(releaseDate)}</Text>
            <Text numberOfLines={4} style={styles.summary}>{summary}</Text>
            <View style={styles.languages}>
                {languages?.map((language, i) => (
                    <Tag text={language} backgroundColor="#4C5B6A" textColor="#C1C5C9"/>
                ))}
            </View>
            <View style={styles.footer}>
                <Score value="3.4" total="3543"></Score>
                <ButtonWithIcon text="Mi lista" icon={plusIcon} onPress={() => alert("Add to my list tapped")}></ButtonWithIcon>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#34424F',
        padding: 24
    },
    genres: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    languages: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 4
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24
    },
    releaseDate: {
        color: '#C1C5C9',
        marginBottom: 12
    },
    summary: {
        color: '#C1C5C9',
        marginBottom: 8
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    }
});