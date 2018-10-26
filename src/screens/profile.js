import React, {Component} from 'react';
import {Platform, StyleSheet,Image,Text, View,SafeAreaView} from 'react-native';

export default class ProfileScreen extends Component {

    render() {
      return (
        <View >
        <View style={styles.view}>
          <View><Text style={styles.title}>Profile</Text></View>
          {/* <Image source/> */}
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    view: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'orange',
      width: '100%',
      fontSize: 24,
      fontWeight: 'bold',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  })