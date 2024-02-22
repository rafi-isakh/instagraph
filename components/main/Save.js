import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app'
require('firebase/compat/firestore')


export default function Save(props, {navigation}) {
  const [caption, setCaption] = useState("")

  const uploadImage = async () => {
    const uri = props.route.params.image
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    
    const response = await fetch(uri)
    const blob = await response.blob()

    const storage = getStorage();
    const storageRef = ref(storage, childPath);
    const uploadTask = uploadBytesResumable(storageRef, blob)

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        savePostData(downloadUrl)
        console.log('File available at ', downloadUrl)
      })
    }

    const taskError = snapshot => {
      console.log(snapshot)
    }

    uploadTask.on("state_changed", taskProgress, taskError, taskCompleted)
  }

  const savePostData = (downloadUrl) => {
    firebase.firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadUrl,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      }).then((function() {
          props.navigation.popToTop() 
      }))
  } 

  return (
    <View style={{flex: 1}}>
      <Image source={{uri: props.route.params.image}} />
      <TextInput 
        placeholder='Write a caption...'
        onChangeText={(caption) => setCaption(caption)}
      />

      <Button title='Save' onPress={() => uploadImage()}/>
    </View>
  )
}
