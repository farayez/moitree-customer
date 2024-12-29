import { Image, StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import unitData from '@/data/units.json';

type UnitType = 'meters' | 'feet' | 'inches';

export default function UnitConverter() {
  const [input1Unit, setInput1Unit] = useState<UnitType>('meters');
  const [input2Unit, setInput2Unit] = useState<UnitType>('feet');
  const [input1Value, setInput1Value] = useState<string>('');
  const [input2Value, setInput2Value] = useState<string>('');
  const unitOptions = unitData;

  const convertUnits = (value: string, from: UnitType, to: UnitType) => {
    const fromUnit = unitOptions.find((unit) => unit.name === from);
    const toUnit = unitOptions.find((unit) => unit.name === to);
    if (fromUnit && toUnit) {
      const fromValue = parseFloat(value);
      if (isNaN(fromValue)) {
        return '';
      }
      const baseValue = fromValue * fromUnit.factor;
      const convertedValue = baseValue / toUnit.factor;
      const roundedValue = Math.round(convertedValue * 100000) / 100000;
      //   console.log(`Converted ${fromValue} ${from} to ${roundedValue} ${to}`);

      return roundedValue.toString();
    }
    return '';
  };

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
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">How to use</ThemedText>
        <ThemedText>
          Select <ThemedText type="defaultSemiBold">Units</ThemedText> to convert to and from. Then
          enter the <ThemedText type="defaultSemiBold">Value</ThemedText> to convert.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.converterContainer}>
        <View style={[styles.inputContainer, { marginTop: 0 }]}>
          <Picker
            style={[
              styles.dropdown,
              Platform.select({
                web: { padding: 12 },
              }),
            ]}
            mode="dropdown"
            selectedValue={input1Unit}
            onValueChange={(itemValue) => {
              setInput1Unit(itemValue);
              setInput2Value(convertUnits(input1Value, itemValue, input2Unit));
            }}>
            {unitOptions.map((option) => (
              <Picker.Item
                key={option.name}
                label={option.label}
                value={option.name}
                color="black"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numericInput}
            keyboardType="numeric"
            onChangeText={(text) => {
              setInput1Value(text);
              setInput2Value(convertUnits(text, input1Unit, input2Unit));
            }}
            value={input1Value}
          />
        </View>

        <View style={styles.equalSignContainer}>
          <ThemedText type="defaultSemiBold" style={styles.equalSignText}>
            {' '}
            ={' '}
          </ThemedText>
        </View>

        <View style={[styles.inputContainer, { marginTop: 0 }]}>
          <Picker
            style={[
              styles.dropdown,
              Platform.select({
                web: { padding: 12 },
              }),
            ]}
            selectedValue={input2Unit}
            mode="dropdown"
            onValueChange={(itemValue) => {
              setInput2Unit(itemValue);
              setInput2Value(convertUnits(input1Value, input1Unit, itemValue));
            }}>
            {unitOptions.map((option) => (
              <Picker.Item
                key={option.name}
                label={option.label}
                value={option.name}
                color="black"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numericInput}
            keyboardType="numeric"
            onChangeText={(text) => {
              setInput2Value(text);
              setInput1Value(convertUnits(text, input2Unit, input1Unit));
            }}
            value={input2Value}
          />
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
  equalSignContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48, // Ensure it matches the height of the TextInput and Picker
  },
  equalSignText: {
    fontSize: 24,
    alignSelf: 'center', // Center align horizontally
  },
  inputContainer: {
    borderRadius: 8,
    backgroundColor: 'rgba(65, 65, 65, 0.83)',
    borderColor: 'rgba(255, 255, 255, 0.27)',
    borderWidth: 1,
    marginTop: 8,
  },
  dropdown: {
    width: '100%',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 50,
    color: 'rgb(184, 184, 184)',
  },
  numericInput: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(44, 44, 44, 0.8)',
    borderColor: 'transparent',
    borderWidth: 1,
    color: 'rgb(224, 224, 224)',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 50,
  },
});
