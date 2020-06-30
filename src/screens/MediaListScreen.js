import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BaseStyles from '../BaseStyles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout, showSpinner, hideSpinner } from '../actions/application';

MediaListScreen.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object
};

export default function MediaListScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    const dispatch = useDispatch();

    const [listMedia, setListMedia] = useState([]);

    const { mediaType } = route.params;
    const { mediaSearch } = route.params;

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
                <Text style={styles.title}>{list.name}</Text>
                <Text style={styles.itemCount}>{list.itemCount} elementos</Text>
            </View>
            <FlatList
                data={listMedia}
                renderItem={({ item }) => <ListMediaItem {...item} onDeleteListItemTapped={onDeleteListItemTapped} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}