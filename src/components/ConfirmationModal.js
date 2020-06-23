import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { Modal, View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import ErrorIcon from '../../assets/error.png';
import BaseStyles from '../BaseStyles';

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
			<View style={BaseStyles.modalContainer}>
				<View style={BaseStyles.modalBody}>
					<Image source={ErrorIcon} style={{ ...BaseStyles.modalIcon, tintColor: '#FFFFFF' }}></Image>
					<Text style={BaseStyles.modalTitle}>{title}</Text>
					<View style={BaseStyles.modalButtonsContainer}>
						<ButtonWithIcon
							text="Cancelar"
							onPress={onCancel}
							backgroundColor="#FFFFFF"
							color="#1F2D3D"
							fontSize={17}
							marginHorizontal={5}
							grow={true}
							paddingVertical={12}>
						</ButtonWithIcon>
						<ButtonWithIcon
							text="Confirmar"
							onPress={onConfirm}
							backgroundColor="#F18D9E"
							color="#1F2D3D"
							fontSize={17}
							marginHorizontal={5}
							grow={true}
							paddingVertical={12}>
						</ButtonWithIcon>
					</View>
				</View>
			</View>
		</Modal>
	);
}