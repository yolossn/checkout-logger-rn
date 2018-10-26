import React, { Component } from 'react';
import {AsyncStorage,Image, PixelRatio, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');
//components
import CheckoutItem from '../components/checkoutItem';
// import CheckoutDetail from '../components/checkoutDetail';

export default class CheckoutListScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state={
      user:""
    }
    this._user()
    .then((val)=>{
      console.log("shit",val);
      this.state.user=val
    })
  }
  _user=async()=>{
    var val=await AsyncStorage.getItem('user');
    val=JSON.parse(val);
    return val;
  }

  newCheckout = () => {
    const options = {
      title: 'New Checkout',
      takePhotoButtonTitle: 'Capture Bill',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images'// RNFS.DocumentDirectoryPath,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
        this.props.navigation.navigate('NewCheck', { path: response.path, imgSource: response.uri, height: response.height, width: response.width });

      }
    });
    //this.props.navigation.navigate('NewCheckout');
  }

  // const checkoutList = props=>{
  //   return(
  //     < FlatList
  //       data={props.checkouts}
  //       renderItem={ (info) =>(
  //         <CheckoutItem 
  //         id={4} 
  //         title={"Dominos"} 
  //         total={150} 
  //         imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} 
  //         onItemPressed = {()=>props.onItemSelected(info.item.id)}
  //       />
  //         )
  //       }
  //       />

  //   );
  // }

  render() {
    return (
      <View >
        <View style={styles.view}>
          <View><Text style={styles.title}>Checkouts</Text></View>
        </View>
        <ScrollView>
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />          
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />
          <CheckoutItem id={4} title={"Dominos"} total={150} imURL={{ uri: "https://user-images.githubusercontent.com/5842874/37030334-921b1d5a-2175-11e8-8736-5be0cc4ff777.png" }} />

        </ScrollView>
        <TouchableOpacity style={styles.btnNewCheckout} onPress={this.newCheckout.bind(this)}>
          <Icon style={styles.inputIcon} name={'ios-add'} size={40} color={'rgba(255,255,255,0.7)'} />
        </TouchableOpacity>

      </View>

    );
  }
}

const { height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create(
  {
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
    btnNewCheckout: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      backgroundColor: "red",
      borderRadius: 100,
      position: 'absolute',
      bottom: 70,
      right: 20,
    },

  }
)