import React from 'react';
import {
    TextInput,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
} from 'react-native'

import styles from './address-bar.styles'

export interface Props extends TextInputProps {
    value: string
    onTextChange: (value: string) => void
    onEnterPress: (value: string) => void
}

export const AddressBar = ({ value, onTextChange, onEnterPress, ...props }: Props) => (
    <TextInput
        autoCapitalize='none'
        returnKeyType='search'
        placeholder='Search here...'
        style={styles.addressBar}
        value={value}
        onChangeText={onTextChange}
        onSubmitEditing={e => onEnterPress(e.nativeEvent.text)}
        {...props}
    />
)
