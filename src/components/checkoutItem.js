import React,{component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';


const CheckoutItem =(props) =>(
    <View style={styles.listItem}>
        <Image style={styles.listImage} source={props.imURL}/>
        <View style={styles.textPos}>
            <View style={{flexDirection:"row"}}>
                <Text>ID:{props.id}</Text>
                <Text style={{paddingLeft:25}}>Title:{props.title}</Text>
            </View>
            <Text style={styles.testTot}>Total:{props.total}</Text>
        </View>
    </View>
);

const styles =StyleSheet.create({
    listImage:{
        width:60,
        height:60,
    },
    textPos:{
        paddingLeft:10,
        paddingTop:5,
    },
    testTot:{
        paddingTop:10
    },
    listItem:{
        width:"100%",
        padding:15,
        margin:3,
        backgroundColor:"#eee",
        borderRadius:4,
        borderBottomColor: 'orange',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
    }
});

export default CheckoutItem;