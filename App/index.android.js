import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import Homeview from './app/page/home/Home';

class App extends Component {

    render() {

        return ( 
          <Homeview />
        );
    }
}


AppRegistry.registerComponent('App', () => App);