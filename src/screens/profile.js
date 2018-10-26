import React, {Component} from 'react';
import {Dimensions,TouchableOpacity,StyleSheet,Image,Text, View,ScrollView} from 'react-native';

export default class ProfileScreen extends Component {
    constructor(props)
    {
      super(props);
      // const val=Asyn
      this.state = {
        uname:"tester",
        email:"aa@aa.aa",
        imurl:"https://cdn-images-1.medium.com/max/1000/1*jDIj2SKAE-Bp32owLoHDjw.png",
        budget:300,
      }
      this._user()
      .then(val=>{
        console.log(val);
        // this.state.uname=val.
      })
    }
    _user=async()=>{
      var val=await AsyncStorage.getItem('user');
      val=JSON.parse(val);
      return val;
    }
    render() {
      return (
        <View style={styles.view}>
          <View><Text style={styles.title}>Profile</Text></View>
          <ScrollView style={{width:"100%"}}>
          <View style={styles.content}>
          <Image style={styles.pImage} source={{uri:this.state.imurl}}/> 
            <Text style={styles.cText}>Username:{this.state.uname}</Text>
            <Text style={styles.cText}>Email:{this.state.email}</Text>
            <Text style={styles.cText}>Budget:{this.state.budget}</Text>
            <TouchableOpacity style={styles.btn} onPress={()=>{console.log("shit");}}>
                    <Text style={styles.text}>EDIT BUDGET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{this.props.navigation.navigate('Login')}}>
                    <Text style={styles.text}>LOGOUT</Text>
            </TouchableOpacity>
            <View style={{height:40}}>
              </View>
          </View>
          </ScrollView>
        </View>
      );
    }
  }
const { width: WIDTH } = Dimensions.get('window');

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
    pImage:{
      borderRadius:100,
      width:200,
      height:200,
      paddingTop:25,
      paddingBottom:25,
      borderColor:"red",
      borderWidth:2,
    },
    content:{
      justifyContent:'center',
     alignContent:'center',
      alignItems:"center"
    },
    cText:{
      padding:10,
      fontSize:20,
      fontWeight:"bold",
    },
    btn: {
      width: WIDTH - 120,
      height: 45,
      borderRadius: 25,
      backgroundColor: 'rgba(127,127,127,0.7)',
      marginTop: 15,
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    marginTop: 5,
}
  })