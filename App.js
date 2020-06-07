import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import MediaCarousel from './src/components/MediaCarousel';

export default function App() {
	return (
		<ScrollView style={styles.container}>
			<MediaCarousel title="Mejor valoradas" buttonLabel="Ver más +" />
			<MediaCarousel title="Según su popularidad" buttonLabel="Ver más +" width={130} height={250} />
			<MediaCarousel title="Llegaron al cine!" buttonLabel="Ver más +" width={130} height={250} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1F2D3D'
	}
});
