import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrinkScreen = () => {
  const [drink, setDrink] = useState('');
  const [drinks, setDrinks] = useState([]);

  const saveDrink = async () => {
    try {
      const existingDrinks = await AsyncStorage.getItem('drinks');
      const newDrinks = existingDrinks ? JSON.parse(existingDrinks).concat(drink) : [drink];
      await AsyncStorage.setItem('drinks', JSON.stringify(newDrinks));
      setDrinks(newDrinks);
      setDrink('');
    } catch (e) {
      console.log(e);
    }
  };

  const removeDrink = async (index) => {
    try {
      const updatedDrinks = drinks.filter((_, i) => i !== index);
      await AsyncStorage.setItem('drinks', JSON.stringify(updatedDrinks));
      setDrinks(updatedDrinks);
    } catch (e) {
      console.log(e);
    }
  };

  const renderDrinks = ({ item, index }) => {
    return (
      <View style={styles.drinkItem}>
        <Text style={styles.drinkText}>{item}</Text>
        <Button title="Remove" onPress={() => removeDrink(index)} color="#ff5252" />
      </View>
    );
  };

  const loadDrinks = async () => {
    try {
      const storedDrinks = await AsyncStorage.getItem('drinks');
      setDrinks(storedDrinks ? JSON.parse(storedDrinks) : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadDrinks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your own drink recipe..."
          value={drink}
          onChangeText={setDrink}
          autoCorrect={false}
          returnKeyType="done"
        />
        <Button title="Save" onPress={saveDrink} color="#28a745" />
      </View>
      <FlatList
        data={drinks}
        renderItem={renderDrinks}
        keyExtractor={(item) => item}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  flatList: {
    marginTop: 10,
  },
  drinkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  drinkText: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
});

export default DrinkScreen;
