import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SymbolScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const storeItem = async () => {
    try {
      if(text.length>0){
        await AsyncStorage.setItem('trades', JSON.stringify([...items, text]));
        setItems([...items, text]);
        setText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('trades');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeSymbol = async ({ item, index }) => {
    try {
      const updatedItems = items.filter((_, i) => i !== index);
      await AsyncStorage.setItem('trades', JSON.stringify([updatedItems]));
      await AsyncStorage.setItem(`${item}`, '');
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          style={styles.item} 
          onPress={() => {
            navigation.navigate('Trade', { symbol: item });
          }}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeSymbol({ item, index })}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter stock symbol"
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.addButton} onPress={storeItem}>
        <Text style={styles.addButtonText}>Add Company</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius:5,
    padding: 10,
    marginVertical: 5
  },
  itemText: {
    fontSize: 18,
    fontWeight:'bold'
  }
});


export default SymbolScreen;
