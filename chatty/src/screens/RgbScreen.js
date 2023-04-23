import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorCounter from '../components/ColorCounter';

const COLOR_INCREMENT = 15;

const reducer = (state, action) => {
  switch (action.type) {
    case 'change_red':
      return state.red + action.payload <= 255 && state.red + action.payload >= 0
        ? { ...state, red: state.red + action.payload }
        : state;
    case 'change_green':
      return state.green + action.payload <= 255 && state.green + action.payload >= 0
        ? { ...state, green: state.green + action.payload }
        : state;
    case 'change_blue':
      return state.blue + action.payload <= 255 && state.blue + action.payload >= 0
        ? { ...state, blue: state.blue + action.payload }
        : state;
    default:
      return state;
  }
};

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RGB Color Picker</Text>
      <View style={styles.colorContainer}>
        <View style={styles.colorBox}>
          <View style={{ ...styles.color, backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
        </View>
      </View>
      <ColorCounter
        onIncrease={() => dispatch({ type: 'change_red', payload: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ type: 'change_red', payload: -1 * COLOR_INCREMENT })}
        color="Red"
      />
      <ColorCounter
        onIncrease={() => dispatch({ type: 'change_green', payload: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ type: 'change_green', payload: -1 * COLOR_INCREMENT })}
        color="Green"
      />
      <ColorCounter
        onIncrease={() => dispatch({ type: 'change_blue', payload: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ type: 'change_blue', payload: -1 * COLOR_INCREMENT })}
        color="Blue"
      />
      <Text style={styles.rgbText}>
        RGB Color: {red}, {green}, {blue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  colorBox: {
    marginHorizontal: 10,
  },
  color: {
    height: 75,
    width: 75,
    borderRadius: 10,
  },
  rgbText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default SquareScreen;