import React, { useState } from 'react';
import { Modal, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import BaseStyles from '../BaseStyles';
import ButtonWithIcon from './ButtonWithIcon';
import Score from './Score';

RateModal.propTypes = {
	isVisible: PropTypes.bool,
	onConfirm: PropTypes.func,
	animationType: PropTypes.string,
	type: PropTypes.string
};

export default function RateModal(props) {

	const { isVisible, onConfirm, onCancel, animationType = 'none' } = props;

	const isFormValid = () => {
		return rate.score != null && rate.comments != null && rate.comments != ''
	}

	const [rate, setRate] = useState({
		score: 0,
		comments: null
	})

	const onRateUpdated = (value) => {
		setRate({ ...rate, score: value })
	}

	const onModalCancel = () => {
		setRate({
			score: 0,
			comments: null
		})
		onCancel()
	}

	return (
		<Modal
			animationType={animationType}
			transparent={true}
			visible={isVisible}
			onRequestClose={onConfirm}>
			<View style={BaseStyles.modalContainer}>
				<View style={BaseStyles.modalBody}>
					<Text style={BaseStyles.modalTitle}>Calificar</Text>
					<Score
						isInteractive={true}
						showTitle={false}
						value={rate.score}
						starSize={40}
						onItemTapped={onRateUpdated}>
					</Score>
					<Text style={{ ...BaseStyles.label, marginTop: 15 }}>Comentarios (*)</Text>
					<TextInput
						style={{ ...BaseStyles.input }}
						numberOfLines={5}
						textAlignVertical="top"
						multiline={true}
						placeholder="Ingresá tus comentarios sobre la serie o pelicula que estas calificando..."
						onChangeText={(text) => setRate({...rate, comments: text})}
						value={rate.comments}>
					</TextInput>
					<ButtonWithIcon
						text="CONFIRMAR"
						backgroundColor={isFormValid() ? '#E6D72A' : '#FFF57E'}
						marginBottom={10}
						color="#000000"
						grow={true}
						isEnabled={() => isFormValid()}
						paddingVertical={12}
						onPress={() => onConfirm(rate.score, rate.comments)}>
					</ButtonWithIcon>
					<ButtonWithIcon
						text="CANCELAR"
						backgroundColor="#344251"
						color="#FFFFFF"
						paddingVertical={12}
						grow={true}
						onPress={onModalCancel}>
					</ButtonWithIcon>
				</View>
			</View>
		</Modal>
	);
}