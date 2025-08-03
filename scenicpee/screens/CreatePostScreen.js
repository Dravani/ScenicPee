import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'

const CreatePostScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  
      if (cameraStatus !== 'granted') {
        alert('Camera permission not granted!');
      }
      if (mediaStatus !== 'granted') {
        alert('Media permission not granted!');
      }
      if (locationStatus !== 'granted') {
        alert('Location permission not granted!');
      }
    })();
  }, []);
  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.6,
      });
  
      console.log('Camera Result:', result);
  
      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        console.log('User canceled or no image returned.');
      }
    } catch (error) {
      console.error('Error launching camera:', error);
      alert('Something went wrong while opening the camera.');
    }
  };
  
  const getLocation = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const createPost = async () => {
    if (image == null || location == null) {
      console.error("image or locaiton cannot be null");
      alert("Image and Location must be present");
      return;
    }
  
    const data = {
      caption: caption,
      location: location, 
      image: image, 
    }

    const res = await addDoc(collection(db, "Posts"), data);
    console.log(res);

  };

  return (
    <View style={styles.container}>
      <Button title="Take a photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
      <Button title="Get location" onPress={getLocation} />
      {location && (
        <Text style={{ marginTop: 10 }}>
          📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
      <TextInput
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />
      <Button title="Post Pee" onPress={createPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: 10,
    width: '100%',
    borderBottomWidth: 1,
    padding: 8,
  },
});

export default CreatePostScreen;
