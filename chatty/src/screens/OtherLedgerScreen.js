import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal,Button, TextInput, FlatList, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtherLedgerScreen = ({}) => {
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [merchant, setMerchant] = useState("");
  const [spends, setSpends] = useState([]);

  async function loadTotalAndSpends() {
    try {
      const savedTotal = await AsyncStorage.getItem("totalOther");
      const savedSpends = await AsyncStorage.getItem("otherHistory");
      setTotal(savedTotal?parseFloat(savedTotal):0);
      setSpends(savedSpends?JSON.parse(savedSpends):[]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!isNaN(total)) loadTotalAndSpends();
  }, []);

  const onPressAdd = async () => {
    try {
      const newTotal = (parseFloat(total) + parseFloat(number)).toFixed(2);
      const newSpend = { amount: parseFloat(number).toFixed(2), merchant, date: new Date().toLocaleDateString()};
      await AsyncStorage.setItem("totalOther", newTotal.toString());
      await AsyncStorage.setItem("otherHistory", JSON.stringify([newSpend, ...spends]));
      setTotal(newTotal);
      setSpends([newSpend, ...spends]);
      setNumber('0');
      setMerchant('');
    } catch (err) {
      console.log(err);
    }
  };

  const removeSpend = async (item, index) => {
    try {
      const updatedSpends = spends.filter((_, i) => i !== index);
      await AsyncStorage.setItem("otherHistory", JSON.stringify(updatedSpends));
      await AsyncStorage.setItem("totalOther", (parseFloat(total) - parseFloat(item.amount)).toString());
      setSpends(updatedSpends);
      setTotal(parseFloat(total) - parseFloat(item.amount));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Other Ledger Screen</Text>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.total}>Total: ${total}</Text>
      </TouchableOpacity>
      <Modal visible={visible} animationType="slide">
        <Text style={styles.title}>Add Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={number.toString()}
          onChangeText={setNumber}
        />
        <TextInput
          style={styles.input}
          value={merchant}
          onChangeText={setMerchant}
          autoCorrect={false}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={onPressAdd} style={styles.button} />
          <Button
            title="Close"
            onPress={() => setVisible(false)}
            style={styles.button}
          />
        </View>
        <FlatList
          data={spends}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.amount}</Text>
                <Text style={styles.itemText}>{item.merchant}</Text>
                <Text style={styles.itemText}>{item.date}</Text>
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

export default OtherLedgerScreen;
