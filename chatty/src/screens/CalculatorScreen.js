import React,{useState} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CalculatorScreen = () => {
    const [number,setNumber]=useState('0');
    const [total,setTotal]=useState(0);
    const [history,setHistory]=useState('');

    const pressAdd = () => {
        setHistory(`${parseFloat(total)}+${parseFloat(number)}=${parseFloat(total)+parseFloat(number)}`);
        let tmpTotal=parseFloat(total)+parseFloat(number);
        setTotal(tmpTotal.toFixed(2));
        setNumber('0');
    };
    const pressDeduct = () => {
        setHistory(`${parseFloat(total)}-${parseFloat(number)}=${parseFloat(total)-parseFloat(number)}`);
        setTotal(parseFloat(total)-parseFloat(number));
        setNumber('0');
    };
    const pressHistory=()=>{
        let indexOfSign=history.indexOf('-')!==-1?history.indexOf('-'):history.indexOf('+');
        setTotal(parseFloat(history.substring(0,indexOfSign)));
    };
    const pressClear=()=>{
        setTotal(0);
        setNumber('0');
    };

    return (
        <View>
            <Text style={styles.total}>{total}</Text>
            <TextInput 
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={(number)=>setNumber(number)}
            />
            <Button 
                title="Add" 
                onPress={pressAdd}
            />
            <Button 
                title="Deduct" 
                onPress={pressDeduct}
            />
            <Button 
                title="Clear" 
                onPress={pressClear}
            />
            <Button 
                color='black' 
                style={styles.history} 
                title={history} 
                onPress={()=>pressHistory()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth:1,
        borderColor:'black',
        height:50,
        fontSize:27,
        padding:10,
        textAlign: 'center',
        margin: 15
    },
    total: {
        fontSize: 70,
        textAlign: 'center',
        margin: 20
    },
    history: {
        textAlign: 'center',
        fontSize:15,
        marginTop: 20,
    }
});

export default CalculatorScreen;