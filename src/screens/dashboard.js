import React, {Component} from 'react';
import {Dimensions,ProgressBarAndroid,Platform, StyleSheet, Text,ScrollView ,View} from 'react-native';
import  {PieChart,BarChart, ProgressChart} from 'react-native-chart-kit';
import axios from "axios"; 

const { width: WIDTH } = Dimensions.get('window');

    const chartConfig={
     backgroundColor:"#f0f0f0",
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }  

export default class DashboardScreen extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        budget:[0.4],
        monthly:{
          labels:['Jan','Feb','Mar'],
          datasets:[{
            data:[20,45,12]
          }]
        },
        Category:[
            { name: 'Food', population: 2000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Cloths', population: 5000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Travel', population: 800, color: '#0F0', legendFontColor: '#0F0', legendFontSize: 15 },
          ],
      id:"",
      cData:"",
      load:true,
      }
      this._user().
      then((val)=>{
        console.log("shit",val);
        this.setState({
          id:val,
          checkouts:""
        })
        this.getCheckout()
      })
      .catch((err)=>{
        console.log("caant geet info ");
      })
    }
    _user=async()=>{
      var val=await AsyncStorage.getItem('user');
      val=JSON.parse(val);
      return val;
    }
    getCheckout=() =>{
      console.log("dashboard reuet",this.state.id);
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
          })
      })
    }

    loadData=()=>{
      if(this.state.load && this.state.checkouts==="")
      {
        return(<View style={{alignSelf:"center"}}><Text>Oh Snap ! No Data found</Text></View>)
      }
      else if (this.state.load && this.state.checkouts!==""){
        return(
        <View>
        <View style={styles.budget}>
        <Text style={{fontSize:20}}>Monthly Budget:5000</Text>
        </View>
        <ProgressChart style={styles.card} data={this.state.budget} width={WIDTH-20} height={120} chartConfig={chartConfig}/>
        <View style={styles.budget}>
        <Text style={{fontSize:20}}>Monthly Expenditure</Text>
        </View>
        <BarChart  style={styles.card} data={this.state.monthly} width={WIDTH-20} height={270} chartConfig={chartConfig}/>
        <View style={styles.budget}>
        <Text style={{fontSize:20}}>Heat Map</Text>
        </View>
        <PieChart
         style={styles.card}
         data={this.state.Category}
         width={WIDTH}
         height={220}
         accessor="population"
         chartConfig={chartConfig}
         />
         </View>
        )
      }
    }

    render() {
      return (
          <ScrollView style={{width:"100%"}}>
        <View style={styles.view}>
          <View><Text style={styles.title}>Dashboard</Text></View>
        </View>
          {this.loadData()}
        </ScrollView>
      );
    }
  }

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
    budget:{
      padding:5,
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
    },
    card:{
      borderRadius:15,
      paddingLeft:10,
      paddingRight:20,
    }
  })
