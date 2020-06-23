import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { Modal, View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import CheckIcon from '../../assets/check.png';
import InfoIcon from '../../assets/info.png';
import ErrorIcon from '../../assets/error.png';
import BaseStyles from '../BaseStyles';

MessageModal.propTypes = {
	isVisible: PropTypes.bool,
	onConfirm: PropTypes.func,
	title: PropTypes.string,
	animationType: PropTypes.string,
	type: PropTypes.string
};

export default function MessageModal(props) {

	const { isVisible, onConfirm, title, animationType = 'none', type = 'info' } = props;

	const icons = {
		'info': InfoIcon,
		'error': ErrorIcon,
		'success': CheckIcon
	};

	return (
		<Modal
			animationType={animationType}
			transparent={true}
			visible={isVisible}
			onRequestClose={onConfirm}>
			<View style={BaseStyles.modalContainer}>
				<View style={BaseStyles.modalBody}>
					<Image source={icons[type]} style={{ ...BaseStyles.modalIcon, tintColor: styles[type].tintColor }}></Image>
					<Text style={BaseStyles.modalTitle}>{title}</Text>
					<View style={BaseStyles.modalButtonsContainer}>
						<ButtonWithIcon
							text="OK"
							onPress={onConfirm}
							backgroundColor={styles[type].tintColor}
							color={styles[type].color}
							fontSize={17}
							grow={true}
							paddingVertical={12}>
						</ButtonWithIcon>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	info: {
		tintColor: "#E6D72A",
		color: "#1F2D3D"
	},
	error: {
		tintColor: "#F18D9E",
		color: "#1F2D3D"
	},
	success: {
		tintColor: "#60C7AC",
		color: "#1F2D3D"
	}
})