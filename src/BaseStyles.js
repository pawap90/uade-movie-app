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
	modalContainer: {
		display: 'flex',
		backgroundColor: 'rgba(31,45,61,.7)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalBody: {
		paddingHorizontal: 24,
		paddingVertical: 32,
		borderRadius: 10,
		width: '70%',
		backgroundColor: '#4B5B6B',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalTitle: {
		fontSize: 24,
		color: '#FFF',
		textAlign: 'center',
		marginBottom: 15
	},
	modalButtonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	modalIcon: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
		marginBottom: 20
	},
	tabBarIcon: (focused) => {
		return {
			width: 20,
			height: 20,
			resizeMode: 'contain',
			tintColor: focused ? '#E6D72A' : '#FFFFFF'
		};
	}
});

export default BaseStyles;