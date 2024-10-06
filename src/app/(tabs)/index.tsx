import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React from 'react';
import useFetch from '@/hooks/useFetch';

export default function HomeScreen() {
  const url = 'http://192.168.0.244:3001/api/health-check';

  const {
    data: healthCheckResponse,
    error: healthCheckError,
    loading: healthCheckLoading,
  } = useFetch(url);

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
        <ThemedText type="title">Networking Test </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {healthCheckLoading ? (
          <ThemedText>Loading....</ThemedText>
        ) : healthCheckError ? (
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">{healthCheckError.message}</ThemedText>
            <ThemedText type="defaultSemiBold">{healthCheckError?.cause?.error}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Response</ThemedText>
            <ThemedText type="defaultSemiBold">{healthCheckResponse.app}</ThemedText>
          </ThemedView>
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
