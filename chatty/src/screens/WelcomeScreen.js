import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import useIdea from '../hooks/useIdea';

const WelcomeScreen = ({navigation}) => {
    const [idea,errorMessage]=useIdea();

    return (
        <View style={{flex:1}}>
            <Text style={styles.date}>{new Date().toJSON().slice(0, 10)}</Text>
            <Text style={styles.time}>{Date().slice(16,21)}</Text>
            <Text style={styles.idea}>{idea}</Text>
            <Text>{errorMessage}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('appFlow')}>
                    <Image source={require('../../assets/1.png')} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    date: {
        fontSize:40,
        fontFamily:'Georgia',
        marginTop:55,
        textAlign:'center',
        color:'rgb(90,195,240)'
    },
    time:{
        fontSize:80,
        fontFamily:'Palatino',
        marginTop:40,
        textAlign:'center',
        color:'rgb(90,70,70)'
    },
    idea:{
        fontSize:25,
        fontFamily:'Georgia',
        marginTop:75,
        borderWidth:1,
        borderColor:'rgb(135,195,240)',
        textAlign:'center',
        padding:50,
        color:'rgb(135,195,240)'
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});

export default WelcomeScreen;