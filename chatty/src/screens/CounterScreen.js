import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';

const CounterScreen = ({navigation}) => {
    return (
        <View>
            <Button title="投简历" onPress={()=>navigation.navigate('Resume')} />
        </View>
    );
};

const styles=StyleSheet.create({});

export default CounterScreen;