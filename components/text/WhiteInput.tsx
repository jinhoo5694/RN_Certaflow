import * as React from 'react';
import {Dimensions, TextInput} from 'react-native';

export default function WhiteInput(props: any) {
  const value = props.value;
  const onChange = props.onChange;
  const placeHolder = props.placeHolder;
  const secure = props.secure;
  const type = props.type;

  return (
    <TextInput
      style={{
        height: 40,
        width: Dimensions.get('window').width * 0.562,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 6,
      }}
      placeholder={placeHolder}
      value={value}
      onChangeText={onChange}
      keyboardType={type}
      secureTextEntry={secure}
    />
  );
}
