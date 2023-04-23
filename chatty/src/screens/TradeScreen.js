import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from '@expo/vector-icons';

const TradeScreen = ({navigation}) => {
  const [qty, setQty] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [reason, setReason] = useState('');
  const [trades, setTrades] = useState([]);
  const [actionOpen, setActionOpen] = useState(false);
  const [actionValue, setActionValue] = useState('Buy');
  const [action, setAction] = useState([
    { label: "Buy", value: "Buy" },
    { label: "Sell", value: "Sell" },
  ]);

  async function loadTrades() {
    try {
      const savedTrades = await AsyncStorage.getItem(navigation.getParam('symbol',''));
      setTrades(savedTrades?JSON.parse(savedTrades):[]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadTrades();
  }, []);

  const onPressAdd = async () => {
    try {
      const lastTrade = trades[trades.length - 1];
      const lastUnitCost = lastTrade ? lastTrade.unitCost : 0;
      const newTrade = { qty, unitCost, actionValue, reason, date: new Date().toLocaleDateString(), gain: ((unitCost - lastUnitCost) / lastUnitCost) * 100 };
      await AsyncStorage.setItem(navigation.getParam('symbol',''), JSON.stringify([...trades, newTrade]));
      setTrades([...trades, newTrade]);
      setQty('');
      setUnitCost('');
      setReason('');
    } catch (err) {
      console.log(err);
    }
  };

  const removeTrade = async (index) => {
    try {
      const updatedTrades = trades.filter((_, i) => i !== index);
      await AsyncStorage.setItem(navigation.getParam('symbol',''), JSON.stringify(updatedTrades));
      setTrades(updatedTrades);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} keyboardType="numeric" value={qty.toString()} onChangeText={setQty} placeholder="Qty" />
      <TextInput style={styles.input} keyboardType="numeric" value={unitCost.toString()} onChangeText={setUnitCost} placeholder="unitCost" />
      <DropDownPicker
            style={styles.input}
            open={actionOpen}
            value={actionValue}
            items={action}
            setOpen={setActionOpen}
            setValue={setActionValue}
            setItems={setAction}
            placeholder="Buy/ Sell"
            zIndex={3000}
            zIndexInverse={1000}
          />
      <TextInput style={styles.input} value={reason} onChangeText={setReason} autoCorrect={false} placeholder="reason" />
    <View>
    <TouchableOpacity style={styles.button} onPress={onPressAdd}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.header}>
    <Text style={[styles.headerText,{flex:1}]}>Qty</Text>
    <Text style={[styles.headerText,{flex:2}]}>Unit Cost</Text>
    <Text style={[styles.headerText,{flex:5}]}>Gain</Text>
  </View>
  <FlatList
    data={trades}
    renderItem={({ item, index }) => {
      return (
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{item.qty}</Text>
          <Text style={styles.itemText}>{item.unitCost}</Text>
          <Text style={styles.itemText}>{item.actionValue}</Text>
          <Text style={styles.itemText}>{item.reason}</Text>
          <Text style={styles.itemText}>{item.gain?item.gain+'%':null}</Text>
          <Text style={styles.itemText}>{item.date}</Text>
          <TouchableOpacity style={{backgroundColor: '#ff6b6b',borderRadius:5}} onPress={() => removeTrade(index)}>
            <Ionicons name="remove-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      );
    }}
    keyExtractor={(item, index) => index.toString()}
  />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemText: {
    marginRight: 10,
    flex:1
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TradeScreen;
