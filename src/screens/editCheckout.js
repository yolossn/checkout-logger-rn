import React, { Component } from 'react';
import {AsyncStorage,TextInput,Image, FlatList, Dimensions, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
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
            id:"",
            checkID:"",
            title:"",
            tax:"",
            total:"",
            desc:"",
            loc:"",
            uri:"",
            date:"",
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
                    checkID:resp.data.checkout._id,
                    title:resp.data.checkout.title,
                    tax:resp.data.checkout.total_tax==="Cant Parse TAX"?"0":resp.data.checkout.total_tax,
                    total:resp.data.checkout.total==="Cant Parse TOTAL"?"0":resp.data.checkout.toal,
                    desc:resp.data.checkout.description,
                    loc:resp.data.checkout.location,
                    uri:resp.data.checkout.bill_picture,
                    date:resp.data.checkout.data
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    submitEdit=()=>{
        console.log("submitting edit");
        axios.post(url+"/api/checkout-edit",{
            _id:this.state.id,
            title=this.state.title,
            tax=this.state.tax,
            total:this.state.total,
            description
        })
    }
    render(){
        return(
        <ScrollView>
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
        <Text style={styles.label} > Description </Text>
        <TextInput style={styles.input} editable={true} numberOfLines={4}
        onChangeText={(text) => this.setState({desc:text})}
        value={this.state.desc}/>
        <TouchableOpacity style={styles.btnLogin} onPress={()=>this.props.navigation.navigate('Signup')}>
               <Text style={styles.text}>SUBMIT</Text>
        </TouchableOpacity> 
        </ScrollView>
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
        alignSelf:"center"
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
        height:45,
        borderRadius:25,
        backgroundColor:'rgba(127,127,127,0.7)',
        marginTop:15,
    },
    text:{
        fontSize:26,
        textAlign:'center',
        color:'rgba(255,255,255,1)',
        marginTop:5,
    }
})