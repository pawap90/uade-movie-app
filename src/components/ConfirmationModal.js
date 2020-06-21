import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { Modal, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

ConfirmationModal.propTypes = {
	isVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	title: PropTypes.string,
	animationType: PropTypes.string
};

export default function ConfirmationModal(props) {

	const { isVisible, onCancel, onConfirm, title, animationType = 'none' } = props;

	return (
		<Modal
			animationType={animationType}
			transparent={true}
			visible={isVisible}
			onRequestClose={onCancel}>
			<View style={styles.container}>
				<View style={styles.body}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.buttonsContainer}>
						<ButtonWithIcon
							text="Cancelar"
							onPress={onCancel}
							backgroundColor="#E6D72A"
							color= "#000000"
							fontSize={17}
							marginHorizontal={5}
							grow={true}>
						</ButtonWithIcon>
						<ButtonWithIcon
							text="Confirmar"
							onPress={onConfirm}
							backgroundColor="#F95F62"
							fontSize={17}
							marginHorizontal={5}
							grow={true}>
						</ButtonWithIcon>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,.7)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	body: {
		paddingHorizontal: 24,
		paddingVertical: 32,
		borderRadius: 10,
		width: '70%',
		backgroundColor: '#4B5B6B',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		color: '#FFF',
		textAlign: 'center',
		marginBottom: 15
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	}
});