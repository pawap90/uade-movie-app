
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Tag from './Tag';

ProfileGenres.propTypes = {
	genres: PropTypes.array
};

export default function ProfileGenres(props) {
	const { genres = [] } = props;
	return (
		<View style={styles.container}>
			<View style={styles.list}>
				{genres.map(genre => (
					<Tag
						key={genre}
						text={genre}
						borderColor="#60C7AC"
						color="#60C7AC"
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});