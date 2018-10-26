import React, { Component } from 'react';
import { AsyncStorage, Alert, TouchableOpacity, Dimensions, TextInput, StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import bgImage from '../loginBackground.jpg';
import logoImage from '../icon.png';
import url from "../../index";


export default class SignupScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            password: null,
            cpassword: null
        }
    }
    async storeUser(data) {
        try {
            await AsyncStorage.setItem("user", data);
        }
        catch (err) {
            console.log(err);
        }
    }
    loginAuth = () => {
        console.log(this.url);
        if (this.state.username !== null && this.state.password !== null && this.state.cpassword !== null) {
            var re = /\S+@\S+\.\S+./;
            if (!re.test(this.state.email)) {
                return Alert.alert("Invlaid Email", "Valid Email id is expected Eg:test@checkout.com", [{ text: 'Ok', onPress: () => console.log() }])
            }
            if (this.state.password === this.state.cpassword) {
                console.log(this.state.username);
                console.log(this.state.email);
                console.log(this.state.password);
                console.log(url+"/api/signup");
                axios.post(url+"/api/signup", {
                    email: this.state.email,
                    name: this.state.username,
                    password: this.state.password
                })
                    .then(resp => {
                        console.log(resp);
                        if (resp.data.message === "Created Account") {
                            this.storeUser(resp.data.user)
                            return Alert.alert("Account Created", "User Account created successfully", [{ text: 'Ok', onPress: () => this.props.navigation.navigate('Login') }])
                        }
                        else if (resp.data.message === "Account with that email address already exists") {
                            return Alert.alert("Account Already Exists", "Account Already Exist. Forgot Password ?", [{ text: 'Ok', onPress: () => console.log() }])
                        }
                    })
                    .catch(err => {
                        if (err.response.data.message==="Account with that email address already exists")
                        return Alert.alert("Account Already Exists", "Account Already Exist. Forgot Password ?", [{ text: 'Ok', onPress: () => console.log() }])
                        console.log("ERROR", err);
                    })
            }
            else
                Alert.alert("Password Mismatch", "Both the passwords must match", [{ text: 'Ok', onPress: () => console.log() }])
        }
    }
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backContainer} >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Sign up</Text>
                </View>

                <View style={styles.InputContainer}>
                    <Icon style={styles.inputIcon} name={'md-person'} size={28} color={'rgba(255,255,255,0.7)'} />
                    <TextInput style={styles.input}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(username) => this.setState({ username })} />
                </View>
                <View style={styles.InputContainer}>
                    <Icon style={styles.inputIcon} name={'ios-at'} size={28} color={'rgba(255,255,255,0.7)'} />
                    <TextInput style={styles.input}
                        placeholder={'Email ID'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(email) => this.setState({ email })} />
                </View>
                <View style={{ height: 10 }}>
                </View>
                <View>
                    <Icon style={styles.inputIcon} name={'md-key'} size={28} color={'rgba(255,255,255,0.7)'} />
                    <TextInput style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={{ height: 10 }}>
                </View>
                <View>
                    <Icon style={styles.inputIcon} name={'md-key'} size={28} color={'rgba(255,255,255,0.7)'} />
                    <TextInput style={styles.input}
                        placeholder={'Confirm Password'}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(cpassword) => this.setState({ cpassword })}
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={this.loginAuth.bind(this)}>
                    <Text style={styles.text}>SIGNUP</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const { width: WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
    backContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 120,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    logoText: {
        fontSize: 20,
        marginTop: 20,
        color: 'white',
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        width: WIDTH - 55,
        height: 45,
        paddingLeft: 45,
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        borderRadius: 45,
    },
    InputContainer: {
        marginTop: 10,
        //paddingTop:25,
        // paddingBottom:10,
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37,
    },
    eyeIcon: {
        position: 'absolute',
        top: 8,
        right: 37,
    },
    btnLogin: {
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
}
);