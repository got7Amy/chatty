import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AwkwardScreen = () => {
  const [entryText, setEntryText] = useState('');
  const [entryDate, setEntryDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('awkwardEntries');
        setEntries(storedEntries ? JSON.parse(storedEntries) : []);
      } catch (error) {
        console.error('Error loading diary entries:', error);
      }
    };

    loadEntries();
  }, []);

  const saveEntry = async () => {
    try {
      const entry = { text: entryText, date: entryDate };
      const existingEntries = await AsyncStorage.getItem('awkwardEntries');
      const newEntries = existingEntries ? JSON.parse(existingEntries).concat(entry) : [entry];
      await AsyncStorage.setItem('awkwardEntries', JSON.stringify(newEntries));
      setEntries(newEntries);
      setEntryText('');
      setEntryDate(new Date());
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const removeEntry = async (entryDate) => {
    try {
      const updatedEntries = entries.filter(entry => entry.date !== entryDate);
      await AsyncStorage.setItem('awkwardEntries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    } catch (error) {
      console.error('Error removing awkward entry:', error);
    }
  };

  const renderEntry = ({ item }) => {
    const entryDate = new Date(item.date);
    return (
      <View>
        <Text>{entryDate.toLocaleDateString()}</Text>
        <Text>{item.text}</Text>
        <Button title="Remove" onPress={() => removeEntry(item.date)} />
      </View>
    );
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="Write your awkward notes here..."
          value={entryText}
          onChangeText={text => setEntryText(text)}
          autoCorrect={false}
          returnKeyType="done"
        />
        <Button title="Save" onPress={saveEntry} />
      </View>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={item => item.date.toString()}
      />
    </View>
  );
};

export default AwkwardScreen;
