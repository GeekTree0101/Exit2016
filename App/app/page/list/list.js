import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import text from './../../stylesheet/text';

class List extends Component {

    render(){

        return(
            <Text style={text.article}> this is article section </Text>
        );
    }
}

module.exports = List;