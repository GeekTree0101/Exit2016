import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity
} from 'react-native';

export default class Playground extends Component{

    constructor(props){
        console.log("create animation Playground View");
        super(props);
        this.state = {
            bounce : new Animated.Value(0)
        };
    }

    componentDidMount(){
        console.log("component mounted");
        this.state.bounce.setValue(1);
        this.action();
    }

    action(){

        this.state.bounce.setValue(1);

        Animated.spring(
            this.state.bounce,
            {
                toValue : 3,
                friction : 0.5
            }
        ).start();

    }
    render(){

        return (
            <View>
                <Animated.View style={{ 
                                   width : 50, 
                                   height :50, 
                                   backgroundColor : '#00ff00',
                                   transform : [
                                       {scale : this.state.bounce}
                                   ]
                                }}
                 
                />
                <Button name = "click" onPress = { () => {this.action();}}/>
            </View>         

        );
    }
}


class Button extends Component {

    render(){
        return (
            <TouchableOpacity onPress = {this.props.onPress}>
                <View style = {{ width : 100, height : 50, backgroundColor : '#0000ff'}}>
                    <Text> {this.props.name} </Text> 
                </View>
            </TouchableOpacity>
        );
    }
}