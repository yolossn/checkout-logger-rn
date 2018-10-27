import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from "axios";
import url from "../../index";

var RNFS = require('react-native-fs');



export default class NewCheckout extends Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false
    }
    constructor(props) {
        super(props);
        console.log('newcheckout');
    }
    postImage = (uri) => {
        console.log("triggered");
        axios.post(url+"/checkout-new",{
            "checkout":uri
        })
    }

    discardFile = (path) => {
        RNFS.exists(path).then(() => {
            return RNFS.unlink(path)
                .then(() => {
                    console.log('File Deleted');
                    this.props.navigation.navigate('Main');
                })
                .catch((err) => { console.log(err.message); })
        })
    }
    render() {
        console.log(this.props);
        const { navigation } = this.props;
        const imSource = navigation.getParam('imgSource');
        const iPath = navigation.getParam('path');
        const iheight = navigation.getParam('height');
        const iwidth = navigation.getParam('width');
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: iheight / 10, width: iwidth / 10 }} source={{ uri: imSource }} />
                <TouchableOpacity style={styles.btnNext} onPress={this.postImage.bind(this, imSource)}>
                    <Text style={styles.text}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnNext} onPress={this.discardFile.bind(this, iPath)}>
                    <Text style={styles.text}>Discard</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const { width: WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create(
    {
        btnNext: {
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
        },

    }
)