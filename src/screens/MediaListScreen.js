import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseStyles from '../BaseStyles';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout, showSpinner, hideSpinner } from '../actions/application';

MediaListScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object
};

export default function MediaListScreen() {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [listMedia, setListMedia] = useState([]);

    /* 
        const { mediaType } = route.params;
        const { mediaSearch } = route.params;
    */
    const mediaType = 'movie';
    const mediaSearch = 'top';

    useEffect(() => {

        dispatch(showSpinner);
        if (mediaSearch === 'top') {
            const getTopRatedMedia = async () => {
                const results = mediaType === 'movie' ? await MovieDbService.getTopRatedMovies() : await MovieDbService.getTopRatedSeries();
                setListMedia(results);
            };
            getTopRatedMedia();
        } else if (mediaSearch === 'popular') {
            const getPopularMedia = async () => {
                const results = mediaType === 'movie' ? await MovieDbService.getPopularMovies() : await MovieDbService.getPopularSeries();
                setListMedia(results);
            };
            getPopularMedia();
        } else if (mediaSearch === 'next') {
            const getNextMedia = async () => {
                const results = mediaType === 'movie' ? await MovieDbService.getUpcomingMovies() : await MovieDbService.getAiringTodaySeries();
                setListMedia(results);
            };
            getNextMedia();
        }
    }, [mediaType]);

    return (
        <View style={BaseStyles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Title</Text>
            </View>
            <FlatList
                data={listMedia}
                renderItem={({ item }) => <ListMediaItem {...item} onDeleteListItemTapped={onDeleteListItemTapped} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontSize: 24
    },
    itemCount: {
        color: '#FFFFFF',
        opacity: 0.7,
        fontSize: 18
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    }
});