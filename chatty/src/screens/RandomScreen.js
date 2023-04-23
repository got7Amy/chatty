import React,{useState} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';

const RandomScreen = () => {
    const [number,setNumber]=useState(0);

    return <View>
        <Button title="Generate" onPress={()=>{
            setNumber(Math.floor(Math.random()*10));
        }} />
        <Text style={{textAlign: 'center', fontSize: 48}}>{number}</Text>
    </View>
};

const styles = StyleSheet.create({});

export default RandomScreen;
