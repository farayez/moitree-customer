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
        <ThemedText type="subtitle">Convert To</ThemedText>
        <Picker
          style={styles.dropdown}
          selectedValue={toUnit}
          onValueChange={(itemValue) => setToUnit(itemValue)}>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Enter</Text>
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
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  numericInput: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: 'rgb(89, 75, 139)',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
});
