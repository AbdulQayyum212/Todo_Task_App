import React from 'react';
import {View, TextInput, Text} from 'react-native';

const InputText = ({
  placeholder,
  style,
  placeholderTextColor,
  secureTextEntry,
  onChange,
  value,
  maxLength,
  onPressIn
}) => {
  return (
    <View>
      <TextInput
        onPressIn={onPressIn}
        placeholder={placeholder}
        style={style}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChange={onChange}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
    </View>
  );
};
export default InputText;
