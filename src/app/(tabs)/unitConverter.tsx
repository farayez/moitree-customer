import { Image, StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';

type UnitType = 'meters' | 'feet' | 'inches';

export default function UnitConverter() {
  const [fromUnit, setFromUnit] = useState<UnitType>('meters');
  const [toUnit, setToUnit] = useState<UnitType>('meters');
  const [fromInput, setFromInput] = useState<string>('0');

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
        <ThemedText type="title">Unit Converter</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">How to use</ThemedText>
        <ThemedText>
          Select <ThemedText type="defaultSemiBold">Units</ThemedText> to convert to and from. Enter
          the <ThemedText type="defaultSemiBold">Value</ThemedText> to convert. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'Ok', android: 'Ok', web: 'Enter' })}
          </ThemedText>{' '}
          to start conversion.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.converterContainer}>
        <ThemedText type="subtitle">Convert From</ThemedText>
        <Picker
          style={styles.dropdown}
          selectedValue={fromUnit}
          onValueChange={(itemValue) => setFromUnit(itemValue)}>
          <Picker.Item label="Meters" value="meters" />
          <Picker.Item label="Feet" value="feet" />
          <Picker.Item label="Inches" value="inches" />
        </Picker>
        <ThemedText type="subtitle">Value</ThemedText>
        <TextInput
          style={styles.numericInput}
          keyboardType="numeric"
          onChangeText={(text) => setFromInput(text)}
          value={fromInput}
        />

        <ThemedText type="subtitle">Convert To</ThemedText>
        <Picker
          style={styles.dropdown}
          selectedValue={toUnit}
          onValueChange={(itemValue) => setToUnit(itemValue)}>
          <Picker.Item label="Meters" value="meters" />
          <Picker.Item label="Feet" value="feet" />
          <Picker.Item label="Inches" value="inches" />
        </Picker>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </View>
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
  converterContainer: {
    padding: 16,
    backgroundColor: 'rgba(66, 87, 102, 0.29)',
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdown: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    color: 'rgb(184, 184, 184)',
  },
  numericInput: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    color: 'rgb(184, 184, 184)',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(89, 75, 139, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // Add inner glow effect
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
