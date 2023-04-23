import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UsefulScreen = ({navigation}) => {
    return <>
        <View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Project')}>
                    <Ionicons name="albums-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Project</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Calendar')}>
                    <Ionicons name="snow-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>今日代办</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Diary')}>
                    <Ionicons name="radio-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Diary</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Year5Calendar')}>
                    <Ionicons name="today-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>五年日记本</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Drink')}>
                    <Ionicons name="wine-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Drink</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Symbol')}>
                    <Ionicons name="trending-up-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Trade</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Awkward')}>
                    <Ionicons name="attach-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Awkward</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game')}>
                    <Ionicons name="game-controller-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Game</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
};

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginVertical: 15,
      borderRadius: 10,
    },
    menuItem: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
    },
    menuItemText: {
      marginTop: 8,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    },
  });  

export default UsefulScreen;