import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = ({ navigation }) => {
  const [todoInput, setTodoInput] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [donelist, setDonelist] = useState([]);

  useEffect(() => {
    // Load todolist and donelist from local storage
    AsyncStorage.getItem(navigation.getParam('date',''), (err, result) => {
      if (!err && result !== null) {
        const { todolist, donelist } = JSON.parse(result);
        setTodolist(todolist);
        setDonelist(donelist);
      }
    });
  }, [navigation.getParam('date','')]);

    const getNextDate = (dateString) => {
        const currentDate = new Date(dateString);
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        return nextDate.toISOString().slice(0, 10);
    };

    const getPrevDate = (dateString) => {
        const currentDate = new Date(dateString);
        const prevDate = new Date(currentDate);
        prevDate.setDate(currentDate.getDate() - 1);
        return prevDate.toISOString().slice(0, 10);
    };

    useEffect(() => {
      // Save todolist and donelist to local storage
      AsyncStorage.setItem(navigation.getParam('date',''), JSON.stringify({ todolist, donelist }));
    }, [todolist, donelist, navigation.getParam('date','')]);

    useEffect(() => {
      // Save todolist and donelist to local storage
      AsyncStorage.setItem(navigation.getParam('date',''), JSON.stringify({ todolist, donelist }));
    }, []);

  const handleAddTodo = () => {
    if (todoInput) {
      setTodolist([...todolist, todoInput]);
      setTodoInput('');
    }
  };

  const handleMarkDone = (index) => {
    const newTodolist = [...todolist];
    const newDonelist = [...donelist, newTodolist.splice(index, 1)[0]];
    setTodolist(newTodolist);
    setDonelist(newDonelist);
  };

  const handleRemoveDone = (index) => {
    const updatedDoneList = donelist.filter((_,i)=>i!==index);
    setDonelist(updatedDoneList);
  };

  const gotoPrevDate = () => {
    const prevDate = getPrevDate(navigation.getParam('date'));
    navigation.navigate('Todo', { date: prevDate });
  };

  const gotoNextDate = () => {
    const nextDate = getNextDate(navigation.getParam('date'));
    navigation.navigate('Todo', { date: nextDate });
  };

  return (
    <View style={styles.container} >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo"
          value={todoInput}
          onChangeText={(text) => setTodoInput(text)}
          returnKeyType="done"
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <View style={[styles.listContainer, styles.listContainerRow]}>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Todo List</Text>
          </View>
          {todolist.map((item, index) => (
            <View style={styles.listItem} key={index}>
              <Text>{item}</Text>
              <Button title="Done" onPress={() => handleMarkDone(index)} />
            </View>
          ))}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Done List</Text>
          </View>
          {donelist.map((item, index) => (
            <View style={styles.listItem} key={index}>
              <Text>{item}</Text>
              <Button title="Remove" onPress={() => handleRemoveDone(index)} />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.navContainer}>
        <Button title="Prev" onPress={gotoPrevDate} />
        <Text style={styles.dateText}>{navigation.getParam('date')}</Text>
        <Button title="Next" onPress={gotoNextDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop:15
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal:9
    },
    textInput: {
      flex: 1,
      height: 35,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingHorizontal: 10,
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 5,
      marginBottom: 20,
    },
    listHeader: {
      backgroundColor: '#f2f2f2',
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
    },
    listHeaderText: {
      fontWeight: 'bold',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 5,
      borderRadius: 5,
    },
    listContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 11
    }
  });
  

export default TodoScreen;