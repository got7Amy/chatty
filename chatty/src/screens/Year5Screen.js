import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Year5Screen = ({ navigation }) => {
  const [diaryInput, setDiaryInput] = useState('');
  const [diarylist, setDiarylist] = useState([]);
  const [inputHeight, setInputHeight] = useState(0);
  
  useEffect(() => {
    AsyncStorage.getItem(navigation.getParam('date','').slice(5), (err, result) => {
      if (!err && result !== null) {
        const { diarylist } = JSON.parse(result);
        setDiarylist(diarylist);
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
      AsyncStorage.setItem(navigation.getParam('date','').slice(5), JSON.stringify({ diarylist }));
    }, [diarylist, navigation.getParam('date','')]);

    useEffect(() => {
      AsyncStorage.setItem(navigation.getParam('date','').slice(5), JSON.stringify({ diarylist }));
    }, []);

  const handleAddDiary = () => {
    if (diaryInput) {
      setDiarylist([...diarylist, diaryInput]);
      setDiaryInput('');
    }
  };

  const handleRemoveDiary = (index) => {
    const updatedDiaryList = diarylist.filter((_,i)=>i!==index);
    setDiarylist(updatedDiaryList);
  };

  const gotoPrevDate = () => {
    const prevDate = getPrevDate(navigation.getParam('date'));
    navigation.navigate('Year5', { date: prevDate });
  };

  const gotoNextDate = () => {
    const nextDate = getNextDate(navigation.getParam('date'));
    navigation.navigate('Year5', { date: nextDate });
  };

  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <View style={styles.container} >
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput,{ height: Math.max(35, inputHeight) }]}
          placeholder="Write your diary..."
          value={diaryInput}
          onChangeText={(text) => setDiaryInput(text)}
          onContentSizeChange={handleContentSizeChange}
          multiline={true}
          numberOfLines={1}
        />
        <Button title="Add" onPress={handleAddDiary} />
      </View>
      <View style={[styles.listContainer, styles.listContainerRow]}>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Diary List</Text>
          </View>
          {diarylist.map((item, index) => (
            <View style={styles.listItem} key={index}>
              <Text>{item}</Text>
              <Button title="Remove" onPress={() => handleRemoveDiary(index)} />
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
  

export default Year5Screen;