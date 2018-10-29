import React,{Component} from 'react';
import {Alert,AsyncStorage,Button,TouchableOpacity,Dimensions,TextInput,StyleSheet,View,Text,ImageBackground,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import bgImage from '../loginBackground.jpg';
import logoImage from '../icon.png';

const url="http://104.196.11.112:8080";


export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            showPass:true,
            press:false,
            // username:null,
            // password:null,
            username:"",
            password:"",
        }
    }
    async storeUser(data) {
        try {
            console.log("storing",data);
            await AsyncStorage.setItem("user", JSON.stringify(data))
            await AsyncStorage.setItem("_id",data._id)
            // await AsyncStorage.setItem("pic",data.p)
            // const val=await AsyncStorage.getItem("user");
            // console.log(JSON.parse(val));
        }
        catch (error) {    
            console.log(error);
        }
    }
   showPass=()=>{
       if(this.state.press==false){
           this.setState({showPass:false,press:true});
       }else{
           this.setState({showPass:true,press:false});}
       }
   loginAuth=()=>{
        if(this.state.username!==null && this.state.password!==null)
        {
            console.log("trying to login");
            axios.post(url+"/api/login",{
                email:this.state.username,
                username:this.state.username,
                password:this.state.password
            })
            .then(resp=>{
                if (resp.data.message === "Success"){
                    console.log(resp)
                    console.log(resp.data);
                    this.storeUser(resp.data.user)
                    this.props.navigation.navigate('Main')}
                })
            .catch(err=>{console.log(err);
                if (err.response.data.message==="Oops! Worng Password.")
                    return Alert.alert("Wrong Password", "Please enter the correct password", [{ text: 'Ok', onPress: () => console.log() }])
                else if (err.response.data.message==="No user has been found")
                    return Alert.alert("Wrong Email", "No Account with the given email id Exists !", [{ text: 'Signup', onPress: () => this.props.navigation.navigate('Signup') },{ text: 'Ok', onPress: () => console.log() }])
            })
        }
        else{
            return Alert.alert("Enter Login Details", "Enter the Credentials to Login", [{ text: 'Ok', onPress: () => console.log() }])

        }
   }
    static navigationOptions={
        header:null
    }
    render(){
        return(
            <ImageBackground source={bgImage} style={styles.backContainer} >
                <View style={styles.logoContainer}>
                    <Image source={logoImage}/>
                    <Text style={styles.logoText}>Checkout Logger</Text>
                </View> 

                <View style={styles.InputContainer}>
                    <Icon style={styles.inputIcon} name={'md-person'} size={28} color={'rgba(255,255,255,0.7)'}/>
                    <TextInput style={styles.input} 
                        placeholder={'Email'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'} 
                        value={this.state.username}
                        onChangeText={(username)=>this.setState({username})}/>
                </View>
                <View style={{height:10}}>
                    </View>
                <View>
                    <Icon style={styles.inputIcon} name={'md-key' } size={28} color={'rgba(255,255,255,0.7)'}/>
                    <TextInput style={styles.input} 
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        value={this.state.password}
                        onChangeText={(password)=>this.setState({password})}
                        />
                <TouchableOpacity style={styles.eyeIcon} onPress={this.showPass.bind(this)}>
                    <Icon  name={this.state.press==true?'ios-eye':'ios-eye-off'} 
                    size={28} color={'rgba(255,255,255,0.7)'}/>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={this.loginAuth.bind(this)}>
                    <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={()=>this.props.navigation.navigate('Signup')}>
                    <Text style={styles.text}>SIGNUP</Text>
                </TouchableOpacity> 
            </ImageBackground>
        );
    }
}

const {width:WIDTH}=Dimensions.get('window');
const styles=StyleSheet.create({
    backContainer:{
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:120,
        height:120,
    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
    },
    logoText:{
        fontSize:20,
        marginTop:20,
        color:'white',
    },
    input:{
        backgroundColor:'rgba(0,0,0,0.35)',
        width: WIDTH-55,
        height:45,
        paddingLeft:45,
        fontSize:16,
        color:'rgba(255,255,255,0.7)',
        marginHorizontal:25,
        borderRadius:45,
    },
    InputContainer:{
        marginTop:10,
        //paddingTop:25,
        // paddingBottom:10,
    },
    inputIcon:{
        position:'absolute',
        top:8,
        left:37,
    },
    eyeIcon:{
        position:'absolute',
        top:8,
        right:37,
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
}
);