import React, { Component } from 'react';
import {Alert,ActivityIndicator,AsyncStorage,TextInput,Button,Image, FlatList, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from "axios";
import url from "../../index";


export default class editCheckoutScreen extends Component{
    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center',alignContent:'center',width:"100%",color: 'orange',},
        title: 'Edit Checkout',
    }
    constructor(props){
        super(props);
        this.state={
            isDateTimePickerVisible: false,
            id:"",
            checkID:"",
            title:"",
            tax:"",
            total:"",
            desc:"",
            loc:"",
            uri:"",
            date:"",
            load:true,
        }
    console.log("edit id",this.props.navigation.state.params.c_id);
    this.getCheckout();
    }

    

    getCheckout = () =>{
        axios.get(url+"/api/checkout",{
            params:{_id:this.props.navigation.state.params.c_id},
        })
        .then(resp=>{
            console.log("this checkout data",resp);
            if(resp.data.message==="Found Checkout")
            {
                this.setState({
                    id:this.props.navigation.state.params.user,
                    checkID:String(resp.data.checkout._id),
                    title:String(resp.data.checkout.title),
                    tax:resp.data.checkout.total_tax==="Cant Parse TAX"?"0":String(resp.data.checkout.total_tax),
                    total:resp.data.checkout.total==="Cant Parse TOTAL"?"0":String(resp.data.checkout.total),
                    desc:String(resp.data.checkout.description),
                    loc:String(resp.data.checkout.location),
                    uri:String(resp.data.checkout.bill_picture),
                    date:String(resp.data.checkout.date),
                    load:false
                })
            }
        })
        .catch(err=>{
            console.log(err);
            console.log(err.response);
        })
    }

    submitEdit=()=>{
        console.log("submitting edit");
        axios.post(url+"/api/checkout-edit",{
            _id:this.state.checkID,
            title:this.state.title,
            tax:this.state.tax,
            total:this.state.total,
            description:this.state.description,
            loc:this.state.location,
            uri:this.state.uri,
            date:this.state.date
        })
        .then(resp=>{
            console.log("edit req",resp);
            // return(Alert.alert("Updated Checkout", [{ text: 'Ok', onPress: () => {this.props.navigation.navigate('Main')}}]))
            this.props.navigation.navigate("Main")
        })
        .catch(err=>{
            console.log(err);
            console.log(err.response)
        })
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    _handleDatePicked = (sDate) => {
      console.log('A date has been picked: ', sDate,typeof(sDate));
      this.setState({
          date:String(sDate),
      })
      this._hideDateTimePicker();
    };

    loadForm=()=>{
        if(this.state.load)
        {
            // return(<Text>Loading</Text>)
            return(<ActivityIndicator size="large" color="orange" />)

        }
        else{
            return(<ScrollView style={{padding:5,borderWidth:2,borderColor:"orange"}}>
                <Text style={styles.label}>Title: </Text>
                <TextInput style={styles.input}
                onChangeText={(text) => this.setState({title:text})}
                value={this.state.title}/>
                <Image style={styles.img} source={{uri:this.state.uri}}/>
        
                <Text style={styles.label}> Tax: </Text>
                <TextInput style={styles.input} keyboardType={"numeric"}
                onChangeText={(text) => this.setState({tax:text})}
                value={this.state.tax}/>
                <Text style={styles.label}> Total: </Text>
                <TextInput style={styles.input} keyboardType={"numeric"}
                onChangeText={(text) => this.setState({total:text})}
                value={this.state.total}/>
                <Text style={styles.label}>Date:{this.state.date}</Text>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
                {/* <Button style={styles.btnLogin} onPress={()=>{this._showDateTimePicker}} title="Edit Date" color="orange"/> */}
                <TouchableOpacity style={styles.btnLogin} onPress={this._showDateTimePicker}>
                       <Text style={styles.text}>Edit Date</Text>
                </TouchableOpacity> 
                <Text style={styles.label} > Description </Text>
                <TextInput style={styles.input} editable={true} numberOfLines={4}
                onChangeText={(text) => this.setState({desc:text})}
                value={this.state.desc}/>
                <TouchableOpacity style={styles.btnLogin} onPress={this.submitEdit.bind(this)}>
                       <Text style={styles.text}>SUBMIT</Text>
                </TouchableOpacity> 
                <View style={{height:20}}></View>
                </ScrollView>)
        }
    }
    render(){
        return(
        <View>{this.loadForm()}</View>
        )
    }
}
const { width: WIDTH } = Dimensions.get('window');
const styles =StyleSheet.create({
    input:{
        width: WIDTH - 60,
        padding:10,
        height: 40,
        margin:10, 
        borderColor: 'gray', 
        borderWidth: 1,
        alignSelf:"center",
        borderRadius:8,
    },
    label:{
        fontSize:16,
        fontWeight:"bold",
    },
    img:{
        width:WIDTH-40,
        height:400,
        padding:20,
        margin:20,
        alignSelf:"center",
    },
    btnLogin:{
        width:WIDTH-120,
        borderRadius:10,
        height:45,
        borderRadius:25,
        backgroundColor:'rgba(127,127,127,0.7)',
        marginTop:15,
        alignSelf:"center",
    },
    text:{
        fontSize:26,
        textAlign:'center',
        color:'rgba(255,255,255,1)',
        marginTop:5,
    }
})