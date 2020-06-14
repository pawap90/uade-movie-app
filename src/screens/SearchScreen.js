import React from 'react';
import { ScrollView } from 'react-native';

import BaseStyles from '../BaseStyles';
import PropTypes from 'prop-types';
import MovieDbService from '../services/MovieDbService';

HomeScreen.propTypes = {
	navigation: PropTypes.object
};

export default function SearchScreen(props) {
	const { route } = props;
	const { searchTerm } = route.params;

	const page = 1;
	// TODO: Get from props
	searchTerm = 'jurassic';

	const [searchResult, setSearchResult] = useState({})

	useEffect(() => {
		const searchMovies = async () => {
			const result = await MovieDbService.searchMovies(page, searchTerm);
			setSearchResult(result);
		}
		searchMovies()
	}, [])

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Resultados</Text>
				<Text style={styles.totalResults}>{searchResult.total}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#34424F',
		padding: 24
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 10,
		color: '#FFFFFF'
	},
	title: {
		fontSize: 24
	},
	totalResults: {
		opacity: 0.7,
		fontSize: 18
	}
});