import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { Modal, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import WarningIcon from '../../assets/error.png';
import InfoIcon from '../../assets/info.png';
import BaseStyles from '../BaseStyles';

ConfirmationModal.propTypes = {
	isVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	title: PropTypes.string,
	animationType: PropTypes.string,
	type: PropTypes.string,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
};

export default function ConfirmationModal(props) {

	const {
		isVisible,
		onCancel,
		onConfirm,
		title,
		animationType = 'none',
		type = 'warning',
		confirmText = 'Confirmar',
		cancelText = 'Cancelar'
	} = props;

	return (
		<Modal
			animationType={animationType}
			transparent={true}
			visible={isVisible}
			onRequestClose={onCancel}>
			<View style={BaseStyles.modalContainer}>
				<View style={BaseStyles.modalBody}>
					<Image source={type === 'warning' ? WarningIcon : InfoIcon} style={{ ...BaseStyles.modalIcon, tintColor: '#FFFFFF' }}></Image>
					<Text style={BaseStyles.modalTitle}>{title}</Text>
					<View style={BaseStyles.modalButtonsContainer}>
						<ButtonWithIcon
							text={cancelText}
							onPress={onCancel}
							backgroundColor="#FFFFFF"
							color="#1F2D3D"
							fontSize={17}
							marginHorizontal={5}
							grow={true}
							paddingVertical={12}>
						</ButtonWithIcon>
						<ButtonWithIcon
							text={confirmText}
							onPress={onConfirm}
							backgroundColor={type === 'warning' ? '#F18D9E' : '#60C7AC'}
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