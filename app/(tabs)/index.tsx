import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const url = 'http://localhost:3001/api/health-check';
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((resp) => {
        console.log(resp);

        return resp.json();
      })
      .then((json) => {
        setData(json);
        console.log(json);
      })
      .catch((reason) => {
        setError(reason);
        console.log('Error:', reason);
        // throw reason;
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Networking Test</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {loading ? (
          <Text>Loading....</Text>
        ) : error ? (
          <View>
            <Text style={styles.title}>{error.message}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{data.env.APP_NAME}</Text>
            <Text>{data.env.APP_ENV}</Text>
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
