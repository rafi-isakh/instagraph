import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import firebase from 'firebase/compat/app'
require('firebase/compat/auth')

export class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: '',
    }

    this.onSignup =  this.onSignup.bind(this)
  }

  onSignup() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View>
        <TextInput 
          placeholder="email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput 
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />

        <Button 
          onPress={() => this.onSignup()}
          title="Sign In"
        />
      </View>
    )
  }
}

export default Login