import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, TextInput, FlatList, Linking} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";

const RentalBookkeepingScreen = () => {
  const [outTotal, setOutTotal] = useState(0);
  const [inTotal, setInTotal] = useState(0);
  const [outVisible, setOutVisible] = useState(false);
  const [inVisible, setInVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [income, setIncome] = useState(0);
  const [unit, setUnit] = useState("Unit #1");
  const [spends, setSpends] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [receipt, setReceipt] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [category, setCategory] = useState([
    { label: "Advertising", value: "Advertising" },
    { label: "Auto and travel", value: "Auto" },
    { label: "Cleaning and maintenance", value: "Maintenance" },
    { label: "Commissions", value: "Commissions" },
    { label: "Legal and other professional fees", value: "Legal" },
    { label: "Management fees", value: "Management" },
    { label: "Mortgage interest paid to banks", value: "Mortgage" },
    { label: "Other interest", value: "Interest" },
    { label: "Repairs", value: "Repairs" },
    { label: "Supplies", value: "Supplies" },
    { label: "Taxes", value: "Taxes" },
    { label: "Utilities", value: "Utilities" },
    { label: "Depreciation expense or depletion", value: "Depreciation" },
    { label: "Other", value: "Other" },
  ]);

  async function loadTotalAndSpends() {
    try {
      const savedOutTotal = await AsyncStorage.getItem("totalOut");
      const savedSpends = await AsyncStorage.getItem("outHistory");
      const savedInTotal = await AsyncStorage.getItem("totalIn");
      const savedIncomes = await AsyncStorage.getItem("inHistory");
      setOutTotal(savedOutTotal?parseFloat(savedOutTotal):0);
      setSpends(savedSpends?JSON.parse(savedSpends):[]);
      setInTotal(savedInTotal?parseFloat(savedInTotal):0);
      setIncomes(savedIncomes?JSON.parse(savedIncomes):[]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!isNaN(outTotal)) loadTotalAndSpends();
  }, []);

  const onPressAdd = async () => {
    try{
      const newTotal = (parseFloat(outTotal) + parseFloat(number)).toFixed(2);
      const newSpend = { amount: parseFloat(number).toFixed(2), categoryValue, date: new Date().toLocaleDateString(), receipt};
      await AsyncStorage.setItem("totalOut", newTotal.toString());
      await AsyncStorage.setItem("outHistory", JSON.stringify([newSpend, ...spends]));
      setOutTotal(newTotal);
      setSpends([newSpend, ...spends]);
    } catch (err) {
      console.log(err);
    }
  };

  const onAddIncome = async () => {
    try{
      const newInTotal = (parseFloat(inTotal) + parseFloat(income)).toFixed(2);
      const newIncome = { amount: parseFloat(income).toFixed(2), unit, date: new Date().toLocaleDateString(), };
      await AsyncStorage.setItem("totalIn", newInTotal.toString());
      await AsyncStorage.setItem("inHistory", JSON.stringify([newIncome, ...incomes]));
      setInTotal(newInTotal);
      setIncomes([newIncome, ...incomes]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeIncome = async (item, index) => {
    try {
      const updatedIncomes = incomes.filter((_, i) => i !== index);
      await AsyncStorage.setItem("inHistory", JSON.stringify(updatedIncomes));
      await AsyncStorage.setItem("totalIn", (parseFloat(inTotal) - parseFloat(item.amount)  ).toString());
      setIncomes(updatedIncomes);
      setInTotal(parseFloat(inTotal) - parseFloat(item.amount));
    } catch (error) {
      console.error(error);
    }
  };

  const removeSpend = async (item, index) => {
    try {
      const updatedSpends = spends.filter((_, i) => i !== index);
      await AsyncStorage.setItem("outHistory", JSON.stringify(updatedSpends));
      await AsyncStorage.setItem("totalOut", (parseFloat(outTotal) - parseFloat(item.amount)).toString());
      setSpends(updatedSpends);
      setOutTotal(parseFloat(outTotal) - parseFloat(item.amount));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Out</Text>
        <TouchableOpacity onPress={() => setOutVisible(true)}>
          <Text style={styles.total}>Total: ${outTotal}</Text>
        </TouchableOpacity>
        <Modal visible={outVisible} animationType="slide">
          <Text style={styles.title}>Add Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={number.toString()}
            onChangeText={setNumber}
          />
          <DropDownPicker
            open={categoryOpen}
            value={categoryValue}
            items={category}
            setOpen={setCategoryOpen}
            setValue={setCategoryValue}
            setItems={setCategory}
            placeholder="Select Category"
            zIndex={3000}
            zIndexInverse={1000}
          />
          <TextInput
            style={styles.input}
            value={receipt}
            placeholder="Enter receipt URL"
            onChangeText={setReceipt}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={onPressAdd} style={styles.button} />
            <Button
              title="Close"
              onPress={() => setOutVisible(false)}
              style={styles.button}
            />
          </View>
          <FlatList
            data={spends}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.amount}</Text>
                  <Text style={styles.itemText}>{item.categoryValue}</Text>
                  <Text style={styles.itemText}>{item.date}</Text>
                  <TouchableOpacity onPress={()=>Linking.openURL(item.receipt)}>
                    <Text>receipt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeSpend(item, index)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </Modal>
      </View>
      <View>
        <Text style={styles.header}>In</Text>
        <TouchableOpacity onPress={() => setInVisible(true)}>
          <Text style={styles.total}>Total: ${inTotal}</Text>
        </TouchableOpacity>
        <Modal visible={inVisible} animationType="slide">
          <Text style={styles.title}>Add Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={income.toString()}
            onChangeText={setIncome}
          />
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Unit #1" value="Unit #1" />
            <Picker.Item label="Unit #2" value="Unit #2" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={onAddIncome} style={styles.button} />
            <Button
              title="Close"
              onPress={() => setInVisible(false)}
              style={styles.button}
            />
          </View>
          <FlatList
            data={incomes}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.amount}</Text>
                  <Text style={styles.itemText}>{item.unit}</Text>
                  <Text style={styles.itemText}>{item.date}</Text>
                  <TouchableOpacity onPress={() => removeIncome(item, index)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    color: "blue",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    width: "40%",
  },
  flatList: {
    marginTop: 20,
    maxHeight: 200,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RentalBookkeepingScreen;
