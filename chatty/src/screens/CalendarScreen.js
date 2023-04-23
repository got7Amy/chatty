import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const handleDateSelect = (day) => {
    navigation.navigate('Todo', { date: day.dateString });
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

export default CalendarScreen;