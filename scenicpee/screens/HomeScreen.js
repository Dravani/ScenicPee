import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ActivityIndicator, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);
  
  const openCreatePostScreen = async () => {
	//navigate to the screen
  };

  return (
    <View style={styles.container}>
	THIS IS THE HOMESCREEN HIIIIII.

	<Button
		onPress={() => {
			navigation.navigate('CreatePostScreen');
		}}
		title="Create Post"
		accessibilityLabel="Create a post on scenic pee!"
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


export default HomeScreen;
