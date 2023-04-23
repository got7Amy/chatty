import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CalculatorScreen from './src/screens/CalculatorScreen';
import LedgerScreen from './src/screens/LedgerScreen';
import RandomScreen from './src/screens/RandomScreen';
import UsefulScreen from './src/screens/UsefulScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RgbScreen from './src/screens/RgbScreen';
import CounterScreen from './src/screens/CounterScreen';
import ResumeScreen from './src/screens/ResumeScreen';
import ProjectScreen from './src/screens/ProjectScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import FoodLedgerScreen from './src/screens/FoodLedgerScreen';
import OtherLedgerScreen from './src/screens/OtherLedgerScreen';
import RentalBookkeepingScreen from './src/screens/RentalBookkeepingScreen';
import ROICalculatorScreen from './src/screens/ROICalculatorScreen';
import DrinkScreen from './src/screens/DrinkScreen';
import TodoScreen from './src/screens/TodoScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import SymbolScreen from './src/screens/SymbolScreen';
import TradeScreen from './src/screens/TradeScreen';
import Year5CalendarScreen from './src/screens/5YearCalendarScreen';
import Year5Screen from './src/screens/Year5Screen';
import ChatScreen from './src/screens/ChatScreen';
import ParkScreen from './src/screens/ParkScreen';
import AwkwardScreen from './src/screens/AwkwardScreen';
import GameScreen from './src/screens/GameScreen';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

const switchNavigator = createSwitchNavigator({
  welcomeFlow: WelcomeScreen,
  appFlow: createMaterialBottomTabNavigator({
    toolsFlow: createStackNavigator({
      Tools: ToolsScreen,
      Drink:DrinkScreen,
      Project:ProjectScreen,
      Diary:DiaryScreen,
      Year5Calendar:Year5CalendarScreen,
      Year5:Year5Screen,
      Trade:TradeScreen,
      Symbol:SymbolScreen,
      Calendar:{
        screen:CalendarScreen,
        navigationOptions:{
          date:''
        }
      },
      Todo:TodoScreen,
      Park:ParkScreen,
      Awkward:AwkwardScreen,
      Game:GameScreen
    }),
    usefulFlow: createStackNavigator({
      Useful:UsefulScreen,
      Calculator: CalculatorScreen,
      Random: RandomScreen,
      Rgb: RgbScreen,
      Counter: CounterScreen,
      Resume:ResumeScreen,
      Chat:ChatScreen,
      ROICalculator:ROICalculatorScreen,
    }),
    ledgerFlow: createStackNavigator({
      Ledger:LedgerScreen,
      FoodLedger:FoodLedgerScreen,
      OtherLedger:OtherLedgerScreen,
      RentalBookkeeping:RentalBookkeepingScreen,
    })
  })
});

const AppContainer = createAppContainer(switchNavigator);

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  )
}
 
export default App;