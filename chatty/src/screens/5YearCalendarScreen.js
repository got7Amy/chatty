import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Year5CalendarScreen = ({ navigation }) => {
  const handleDateSelect = (day) => {
    navigation.navigate('Year5', { date: day.dateString });
  }

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDateSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Year5CalendarScreen;