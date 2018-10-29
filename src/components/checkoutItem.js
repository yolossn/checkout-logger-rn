import React, { Component } from 'react';
import { TouchableHighlight, Button, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {withNavigation} from "react-navigation";



export default class CheckoutItem extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            show:false,
        }
    }
    showOptions = () => {
        console.log("changing show from", this.stateshow);
        if (this.state.show) {
            this.setState({
                show: false,
            })
        }
        else {
            this.setState({
                show: true,
            })
        }
        console.log("show of", this.state.show);
    }

    renderOptions = () => {
        if (this.state.show) {
            return(

                <View style={styles.options}>
                    <Button style={styles.bton} title="View" color="white" onPress={() => {this.props.nav('viewCheck',{user:this.props.user,c_id:this.props.id})}}/>
                    <Button style={styles.bton} title="Edit" color="black" onPress={() => {this.props.nav('editCheck',{user:this.props.user,c_id:this.props.id})}}/>
                    <Button style={styles.bton} title="Delete" color="orange" onPress={() => { console.log("Deleting") }} />
                </View>
)
        }
    }

    render() {
        return (
            <View>
                <View style={styles.listItem}>
                    <Image style={styles.listImage} source={this.props.imURL} />
                    <TouchableHighlight style={styles.tap}
                        underlayColor="rgba(255,255,255,.1)"
                        onPress={this.showOptions.bind(this)}>
                        <View style={styles.textPos}>
                            <View style={{ flexDirection: "row" }}>
                                <Text>ID:{this.props.id.slice(0, 5)}</Text>
                                <Text style={{ paddingLeft: 25 }}>Title:{this.props.title}</Text>
                            </View>
                            <Text style={styles.testTot}>Total:{this.props.total}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.renderOptions()}
            </View>
        );
    }
}



const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
    listImage: {
        width: 60,
        height: 60,
    },
    textPos: {
        paddingLeft: 10,
        paddingTop: 5,
        width: "100%",
    },
    testTot: {
        paddingTop: 1
    },
    listItem: {
        width: "100%",
        paddingTop:10,
        margin: 3,
        backgroundColor: "#eee",
        borderRadius: 4,
        borderBottomColor: 'orange',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
    },
    bton: {
        paddingLeft:120,
        marginLeft:120,
        // width: WIDTH/2,
        // alignSelf:'stretch'
        // flex:1
    },
    options: {
        backgroundColor: "orange",
        // flexDirection: "row",
        // flex:3,
        // alignItems:"center",
    },
    tap: {
        width: "100%",
    }
});

