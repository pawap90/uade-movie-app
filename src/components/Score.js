import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import starFull from '../../assets/star-full.png';
import startHalfFull from '../../assets/star-half-full.png';
import starEmpty from '../../assets/star-empty.png';
import PropTypes from 'prop-types';

Score.propTypes = {
	value: PropTypes.number,
	total: PropTypes.number,
	showTitle: PropTypes.bool,
	starSize: PropTypes.number
};

export default function Score(props) {
	const { value, total, showTitle = true, starSize = 20 } = props;

	const starStyles = { ...styles.star, width: starSize, height: starSize };

	const getStar = (targetScore, actualScore) => {
		if (actualScore >= targetScore)
			return <Image key={`${targetScore}`} style={starStyles} source={starFull}></Image>;

		if ((targetScore - actualScore) > 0.5)
			return <Image key={`${targetScore}`} style={starStyles} source={starEmpty}></Image>;

		return <Image key={`${targetScore}`} style={starStyles} source={startHalfFull}></Image>;
	};

	return (
		<View>
			{showTitle && <Text style={styles.title}>IMDB</Text>}
			<View style={styles.stars}>
				{[1, 2, 3, 4, 5].map(item => getStar(item, value))}
				{total && <Text style={styles.total}>{total} votos</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stars: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	title: {
		color: '#C1C5C9',
		marginBottom: 5,
		fontSize: 12
	},
	star: {
		tintColor: '#E6D53F',
		marginRight: 5
	},
	total: {
		marginLeft: 4,
		color: '#C1C5C9',
		fontSize: 12
	}

});