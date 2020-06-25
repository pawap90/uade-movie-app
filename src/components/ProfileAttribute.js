
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonWithIcon from './ButtonWithIcon';
import { TextInput } from 'react-native-gesture-handler';

ProfileAttribute.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	buttonText: PropTypes.string,
	onButtonClick: PropTypes.func,
};

export default function ProfileAttribute(props) {
	const { label, name, value, buttonText, updateProfile } = props;

	const [isEditing, setIsEditing] = useState(false)
	const [newValue, setNewValue] = useState(value)

	const onFinishEditing = () => {
		setIsEditing(false)
		updateProfile(name, newValue)
	}

	const onCancelEditing = () => {
		setIsEditing(false)
		setNewValue(value)
	}

	useEffect(() => {
		setNewValue(value)
	},[value])

	return (
		<View style={styles.container}>
			<View style={styles.attribute}>
				<Text style={styles.label}>{label}</Text>
				{!isEditing && <Text style={styles.value}>{value}</Text>}

				{isEditing && <TextInput value={newValue} style={styles.input} onChangeText={setNewValue} />}
			</View>
			{!isEditing &&
				<ButtonWithIcon
					text={buttonText}
					backgroundColor="#60C7AC"
					color="#000000"
					onPress={() => setIsEditing(!isEditing)}>
				</ButtonWithIcon>
			}
			{isEditing &&
				<View style={{flexDirection: 'row'}}>
					<ButtonWithIcon
						text="Cancelar"
						backgroundColor="#F18D9E"
						color="#000000"
						onPress={onCancelEditing}
						paddingHorizontal={12}
						marginHorizontal={10}>
					</ButtonWithIcon>
					<ButtonWithIcon
						text="Ok"
						backgroundColor="#60C7AC"
						color="#000000"
						onPress={onFinishEditing}
						paddingHorizontal={12}>
					</ButtonWithIcon>
				</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		color: '#9099a4',
		fontSize: 16
	},
	value: {
		color: '#FFFFFF',
		fontSize: 16
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 16
	},
	attribute: {
		flex: 1
	},
	input: {
		backgroundColor: '#344251',
		color: '#FFFFFF',
		padding: 4,
		borderRadius: 5
	}
});