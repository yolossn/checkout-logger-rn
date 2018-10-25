/* import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'

//screens
import DashboardScreen from './dashboard';
import ProfileScreen from './profile';
import CheckoutListScreen from './checkoutList';

export default class TabNavigator extends Component{
  static navigationOptions={
    header:null
      }
  
    render(){
        return(
            <TabNav/>
        )
        }
}

const TabNav= createMaterialTopTabNavigator({
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
  }) */