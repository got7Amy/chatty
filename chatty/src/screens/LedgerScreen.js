import React from 'react';
import {View,Button,StyleSheet} from 'react-native';

const LedgerScreen = ({navigation}) => {
    return (
        <View>
            <Button 
                title='Food Ledger'
                onPress={() => navigation.navigate('FoodLedger')}
            />
            <Button 
                title='Other Spending Ledger'
                onPress={() => navigation.navigate('OtherLedger')}
            />
            <Button 
                title='Rental Bookkeeping Screen'
                onPress={() => navigation.navigate('RentalBookkeeping')}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default LedgerScreen;