import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function CreatePostScreen() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
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
