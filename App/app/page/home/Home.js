import React, {Component} from "react";
import { Text, View } from "react-native";
import styles  from "./../../../android.style.js";

export default class Homeview extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <View style={styles.homeView}>
                <Text style={styles.homeFont}> Hello World </Text>
            </View>
        );
    }
}