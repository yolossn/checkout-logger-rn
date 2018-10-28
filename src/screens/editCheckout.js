import React, { Component } from 'react';
import {AsyncStorage,TextInput,Image, FlatList, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';


export default class editCheckoutScreen extends Component{
    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center',alignContent:'center',width:"100%",color: 'orange',},
        title: 'Edit Checkout',
    }
    constructor(props){
        super(props);
        this.state={
            user:"5bcb3994eb123a7a3b928bd3",
            checkID:"5bcb3994eb123a7a3b928bd3",
            title:"",
            tax:"",
            total:"",
            desc:"",
            loc:""
        }
    }


    render(){
        return(
        <ScrollView>
        <Text style={styles.label}>Title: </Text>
        <TextInput style={styles.input}
        onChangeText={(text) => this.setState({title:text})}
        value={this.state.title}/>
        <Image style={styles.img} source={{uri:"https://storage.googleapis.com/checkout_images/e9bfd088a554d5f8e4c9a707b2662af8"}}/>

        <Text style={styles.label}> Tax: </Text>
        <TextInput style={styles.input}
        onChangeText={(text) => this.setState({tax:text})}
        value={this.state.tax}/>
        <Text style={styles.label}> Total: </Text>
        <TextInput style={styles.input}
        onChangeText={(text) => this.setState({total:text})}
        value={this.state.total}/>
        <Text style={styles.label}> Description </Text>
        <TextInput style={styles.input}
        onChangeText={(text) => this.setState({desc:text})}
        value={this.state.desc}/>
        <Text> Location:</Text>
        </ScrollView>
        )
    }
}
const { width: WIDTH } = Dimensions.get('window');
const styles =StyleSheet.create({
    input:{
        width: WIDTH - 120,
        padding:10,
        height: 40,
        margin:10, 
        borderColor: 'gray', 
        borderWidth: 1,
        alignSelf:"center"
    },
    label:{
        fontSize:16,
        fontWeight:"bold",
    },
    img:{
        width:WIDTH-100,
        height:400,
        padding:20,
        margin:20,
        alignSelf:"center",
    }
})