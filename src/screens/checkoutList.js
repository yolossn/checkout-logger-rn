import React, { Component } from 'react';
import {ActivityIndicator, RefreshControl,AsyncStorage,Image, FlatList, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');
//components
import CheckoutItem from '../components/checkoutItem';
// import CheckoutDetail from '../components/checkoutDetail';

import url from "../../index";

export default class CheckoutListScreen extends Component {
  static navigationOptions = {
    header: null,
    }
  constructor(props) {
    super(props)
    this.state={
      id:"",
      cData:"",
      load:true,
      refreshing: false,
    }
    this._user()
    .then((val)=>{
      console.log("shit",val);
      this.setState({
        id:val,
        checkouts:""
      })
      this.getCheckout()
    })
  }
  _user=async()=>{
    var val=await AsyncStorage.getItem('_id');
    // val=JSON.parse(val);
    return val;
  }

  getCheckout=() =>{
    console.log("retrive checkouts using id:",this.state.id);
    this.setState({
      load:true,
    })
    axios.get(url+"/api/checkout-all",{
      params:{_id:this.state.id},
      // _id:this.state.id,
      // body:{_id:this.state.id},
    }).then((val)=>{
      console.log(val);
      this.setState({
        checkouts:val.data.checkouts,
        load:false,
      })
    })
    .catch(err=>{
      console.log(err);
      console.log(err.response);
            this.setState({
          load:false,
          checkouts:""
        })
      if(err.response.data.message=="No checkouts found")
      {
        this.setState({
          load:false,
        })
      }
    })
  }
  
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
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

  // const listCheckout =(props) =>({
  //   <>
  // })

 loadData=()=>{
   if(this.state.load)
   {
    //  return()
    return(
    <View style={{height:HEIGHT-100}}> 
     <ActivityIndicator size="large" color="orange" />
    </View>)
   }
   else if(this.state.checkouts!=="")
   {
     return(
<View style={{marginTop:10,height:HEIGHT-250,alignContent:"center",justifyContent:"center"}}>       
<FlatList 
        data={this.state.checkouts}
        renderItem={(x)=>
        <CheckoutItem onDelete={this.getCheckout} user={this.state.id} nav={this.props.navigation.navigate} id={x.item._id} title={x.item.title} total={x.item.total} imURL={{ uri: x.item.bill_picture }} />          
        }
        keyExtractor ={(item,index)=>index.toString()}
        />
        <TouchableOpacity style={styles.btnNewCheckout} onPress={this.newCheckout.bind(this)}>
        <Icon style={styles.inputIcon} name={'ios-add'} size={40} color={'rgba(255,255,255,0.7)'} />
      </TouchableOpacity>
</View>
     )
   }
   else
   {
    return(
    <View style={{height:HEIGHT-250,alignContent:"center",justifyContent:"center"}}>
    <ScrollView style={{width:WIDTH,alignSelf:"center"}}> 
    <Text style={{alignSelf:"center"}}>Oh Snap No checkouts Found</Text>
    <Icons style={{alignSelf:"center"}} name={"emoji-sad"} size={60} color={"orange"}/>
   </ScrollView>
           <TouchableOpacity style={styles.btnNewCheckout} onPress={this.newCheckout.bind(this)}>
           <Icon style={styles.inputIcon} name={'ios-add'} size={40} color={'rgba(255,255,255,0.7)'} />
         </TouchableOpacity>
         </View>
   )
   }
 } 

  render() {
    return (
      <View>
        {/* <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/> */}
        <View style={styles.view}>
          <View>
                <TouchableOpacity onPress={this.getCheckout.bind(this)}>
                    {/* <Icon color={"orange"} name={"ios-refresh"} size={30}/> */}
                    <Text style={styles.title}>Checkouts</Text>
                </TouchableOpacity>
          </View>
          <View>
          {this.loadData()}
          </View>
        </View>
      </View>

    );
  }
}

const { height: HEIGHT } = Dimensions.get('window');
const {width:WIDTH}=Dimensions.get('window');

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
      bottom: 90,
      right: 20,
    },

  }
)