import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { useForm, Controller } from 'react-hook-form' //npm install react-hook-form
import { yupResolver } from '@hookform/resolvers/yup' //npm install @hookform/resolvers yup
import * as yup from 'yup'

const schema = yup.object({
  username: yup.string().required('Informe seu username'),
  email: yup.string().email('Email Inválido').required('Informe seu email'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 digitos').required('Informe sua senha')
})


export default function App() {

  const { control, handleSubmit, formState: { errors   } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleSignIn(data) {
    console.log(data)
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Bem-vindo(a)</Text>

      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.username && 1,
                borderColor: errors.username && '#ff375b'
              }
            ]}
            onChangeText={onChange}
            onBlur={onBlur} // chamdo quando o textinput é tocado
            value={value}
            placeholder='Seu username'
          />
        )}
      />
      {errors.username && <Text style={styles.labelError}> {errors.username?.message} </Text>} 

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#ff375b'
              }
            ]}
            onChangeText={onChange}
            onBlur={onBlur} // chamdo quando o textinput é tocado
            value={value}
            placeholder='Digite seu email'
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}> {errors.email?.message} </Text>} 

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.password && 1,
                borderColor: errors.password && '#ff375b'
              }
            ]}
            onChangeText={onChange}
            onBlur={onBlur} // chamdo quando o textinput é tocado
            value={value}
            placeholder='Digite sua senha'
            secureTextEntry={true}
          />
        )}
      />
       {errors.password && <Text style={styles.labelError}> {errors.password?.message} </Text>} 

      

      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  title: {
    fontSize: 34,
    marginBottom: 34,
    color: '#121212',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 8, 
    borderRadius: 4,
    color: '#121212'
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#45d800',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8
  }
});
