import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
	const fetchPosts = async () => {
		const res = await getAllPosts();
		console.log(res);
		setLoading(false);
	};
	fetchPosts();
  }, []);
  
  const getAllPosts = async () => {
	// firebase code to get ...
	const qSnapshot = await getDocs(collection(db, "Posts"));
	qSnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
		posts.push({id: doc.id, data: doc.data()});
	});	
  };

  return (
    <View style={styles.container}>
	{ loading 
		?
		<Text>
		THIS IS THE HOMESCREEN HIIIIII.
		</Text>
	:
		posts.map(post => (<li key={post.id}>{post.data.caption}</li>))
	}
	
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
