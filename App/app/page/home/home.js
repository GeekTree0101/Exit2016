import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import List from './../list/list';


//import stylesheet
import text from './../../stylesheet/text';
import view from './../../stylesheet/view';
import button from './../../stylesheet/button';

class Home extends Component {

    render(){

        return(
            <View style={[view.bgcolor, view.center]}>
                <Header text="What is React?" sub="2016.11.18 GeekTree0101" />
                <List /> 
            </View>
        );
    }
}


class Header extends Component {

    render(){

        return(
            <View>
                <Text style={text.headline} > {this.props.text} </Text>
                <Text style={text.subhead} > {this.props.sub} </Text>
            </View>
        );
    }
}


module.exports = Home;
