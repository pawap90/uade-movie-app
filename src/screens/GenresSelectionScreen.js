import React from 'react';
import { ScrollView, View } from 'react-native';
import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import { GenreSelectionItem } from "../components/GenreSelectionItem";

const GENRES = [
    { genreName: 'Action' },
    { genreName: 'Black & White' },
    { genreName: 'Drama' },
    { genreName: 'Thriller' },
    { genreName: 'Sci Fi' }
]

GenresSelectionScreen.propTypes = {
    title: PropTypes.string
};

export default function GenresSelectionScreen(props) {
    const { title } = props;

    return (
        <div style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView style={BaseStyles.container}>
                <FlatList
                    data={GENRES}
                    renderItem={({ item }) => <GenreSelectionItem genreName={genreName} />}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </div>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Constants.statusBarHeight,
        paddingLeft: Constants.statusBarHeight,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
    }
});