import { StyleSheet } from 'react-native';

const BaseStyles = StyleSheet.create({
	container: {
		backgroundColor: '#1F2D3D',
		paddingHorizontal: 16,
		paddingTop: 16,
		flex: 1
	},
	header: {
		backgroundColor: '#60C7AC'
	},
	tabBar: {
		backgroundColor: '#60C7AC'
	},
	actionButton: {
		fontSize: 16,
		backgroundColor: '#E6D72A',
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 5,
		fontWeight: 'bold'
	},
	tabBarIcon: (focused) => {
		return {
			width: 20,
			height: 20,
			tintColor: focused ? '#E6D72A' : '#FFFFFF'
		};
	}
});

export default BaseStyles;