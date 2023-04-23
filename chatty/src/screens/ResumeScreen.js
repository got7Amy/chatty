import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResumeScreen = () => {
    const [count,setCount]=useState(0);
    const [errorMessage,setErrorMessage]=useState('');

    async function loadCount(){
        try{
            const savedCount = await AsyncStorage.getItem('resume');
            if(savedCount!=null){
                setCount(parseInt(savedCount));
            }
        }catch(err){
            setErrorMessage(err);
        }
    }

    async function saveCount(){
        try{
            await AsyncStorage.setItem('resume',count.toString());
        }catch(err){
            setErrorMessage(err);
        }
    }

    useEffect(()=>{
        loadCount();
    },[]);

    useEffect(()=>{
        saveCount();
    },[count]);

    return (
        <View>
            <Text style={styles.title}>投简历</Text>
            <TouchableOpacity onPress={()=>setCount(count+1)} onLongPress={()=>setCount(count-1)} >
                <Text style={styles.count}>{count}</Text>
            </TouchableOpacity>
            <Text>{errorMessage}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    title:{
        fontSize:25,
        fontFamily:'Georgia',
        marginTop:30,
        textAlign:'center',
    },
    count:{
        fontSize:60,
        fontFamily:'Georgia',
        marginTop:30,
        textAlign:'center',
    }
});

export default ResumeScreen;