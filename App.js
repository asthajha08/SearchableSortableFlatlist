/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, navigationOptions } from 'react-navigation';
import Main from './Main';
import SortedList from './SortedList';
import SecondActivity from './SecondActivity';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Views
} from 'react-native';


const AppNavigator = createStackNavigator({

     Main: {
       screen: Main,
       navigationOptions: {
       mode: 'screen'
     },
     },
     SecondActivity: {
       screen: SecondActivity,
       navigationOptions: {
       mode: 'screen'
      },
     },
     SortedList: {
       screen: SortedList,
       navigationOptions: {
       mode: 'screen'
      },
     },
   },

{
    initialRouteName: 'Main'
}



 );



 class App extends Component {
  render() {
    return (
      <AppNavigator  />
    );
  }
}
export default createAppContainer(AppNavigator);
