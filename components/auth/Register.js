import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import firebase from 'firebase/compat/app'
require('firebase/compat/auth')
require('firebase/compat/firestore')

export class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: '',
      name: ''
    }

    this.onSignup =  this.onSignup.bind(this)
  }

  onSignup() {
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
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
          placeholder="name"
          onChangeText={(name) => this.setState({name})}
        />
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
          title="Sign Up"
        />
      </View>
    )
  }
}

export default Register