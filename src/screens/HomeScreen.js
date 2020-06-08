import React from 'react';
import { ScrollView } from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import BaseStyles from '../BaseStyles'

export default function HomeScreen(props) {
    const { navigation } = props
    
    return (
        <ScrollView style={BaseStyles.container}>
            <MediaCarousel title="Mejor valoradas" buttonLabel="Ver más +" navigation={navigation} />
            <MediaCarousel title="Según su popularidad" buttonLabel="Ver más +" width={130} height={250} />
            <MediaCarousel title="Llegaron al cine!" buttonLabel="Ver más +" width={130} height={250} />
        </ScrollView>
    );
}