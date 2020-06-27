import React from 'react';
import { View } from 'react-native';
import BaseStyles from '../BaseStyles';
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from '../components/ConfirmationModal';
import PropTypes from 'prop-types';

RequiredLoginScreen.propTypes = {
	route: PropTypes.object
};

export default function RequiredLoginScreen(props) {
	const { route } = props;
	const { message } = route.params;

	const navigation = useNavigation();

	const onConfirmTapped = () => {
		navigation.reset({
			routes: [{ name: 'Login' }]
		});
	};

	const onCancelTapped = () => {
		navigation.goBack();
	};

	return (
		<View style={BaseStyles.container}>
			<ConfirmationModal
				title={message}
				type="info"
				confirmText="Ingresar"
				onConfirm={onConfirmTapped}
				onCancel={onCancelTapped}>
			</ConfirmationModal>
		</View>
	);
}