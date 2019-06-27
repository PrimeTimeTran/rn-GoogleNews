import React, { useState, useEffect } from 'react';
import {
  Text, 
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])

  const getNews = async () => {
    console.log('getNews')
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe');
    const jsonData = await response.json()
    setArticles(jsonData.articles)
  }

  useEffect(() => {
    getNews()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          size="large"
          loading={loading}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
