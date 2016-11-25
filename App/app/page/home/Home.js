import React, {Component} from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles  from "./../../../android.style.js";
import Animate from "./../animation/animation";

export default class Homeview extends Component{

    constructor(props){
        super(props);
        this.state = {
            page : 0
        }    
    }

    componentWillMount(){

    }


    render(){

        if(this.state.page == 0){
            return(
                <View style={styles.mainView}>
                    <TouchableHighlight
                        style={styles.homeView}
                        onPressIn = {() => {
                            this.setState({page : 1});
                        }}
                    >   
                        <Text style={styles.homeFont}> Hello World </Text>
                    </TouchableHighlight>
                    <View style={styles.homeScroll}>
                        <Text style={styles.homeScrollFont}> Scroll Section </Text>
                    </View>
                </View>
            );
        }
        else{
            return(
                <Animate />
            );
        }
    }
}