import React from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReadScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Calculator')}>
                    <Ionicons name="calculator-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Calculator</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Random')}>
                    <Ionicons name="shuffle-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Random</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rgb')}>
                    <Ionicons name="color-palette-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>RGB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Counter')}>
                    <Ionicons name="add-circle-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Counter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ROICalculator')}>
                    <Ionicons name="home-outline" size={40} color="black" />
                    <Text style={styles.menuItemText}>ROICalculator</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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

export default ReadScreen;
