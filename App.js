/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
// screens
// import TabNavigator from './src/screens/TabNavigator';
import LoginScreen from './src/screens/login';
import SignupScreen from './src/screens/signup';
import NewCheckout from './src/screens/newCheckout';
import DashboardScreen from './src/screens/dashboard';
import ProfileScreen from './src/screens/profile';
import CheckoutListScreen from './src/screens/checkoutList';

export default class App extends Component{
  render(){
    return(
    <SafeAreaView style={{flex:1}}>
        <AppStackNav/>
      </SafeAreaView>
    )
  }
}


const AppStackNav=createStackNavigator({
  Login:{
    screen:LoginScreen
  },
  Signup:{
    screen:SignupScreen
  },
  NewCheck:{
    screen:NewCheckout
  },
  Main:{
    navigationOptions:{
      header:null
    },
    screen:createMaterialTopTabNavigator({
      Home :{screen:CheckoutListScreen,
      navigationOptions:{
        tabBarLabel:'Checkouts',
        tabBarIcon:({tintColor})=>(
          <Icon name="art-track" color={tintColor} size={24}/>
        )
      }
    },
    DashBoard:{screen:DashboardScreen,
      navigationOptions:{
        tabBarLabel:'Dashboard',
        tabBarIcon:({tintColor})=>(
          <Icon name="assessment" color={tintColor} size={24}/>
        )
      }
    },
      Settings:{screen:ProfileScreen,
      navigationOptions:{
        tabBarLabel:'Profile',
        tabBarIcon:({tintColor})=>(
          <Icon name="account-circle" color={tintColor} size={24}/>
        )
      }
    },
    
    }
    ,
    {
      // initialRouteName:'Settings',
      // order:['Settings','Home'],
      tabBarPosition:"bottom",
      tabBarOptions:{
        activeTintColor:'orange',
        inactiveTintColor:'grey',
        style:{
          backgroundColor:"#FFFFFF",
        },
        showIcon:true
      }
    })
  }
})
// },{initialRouteName:'Main'})

const styles = StyleSheet.create({
  
});
