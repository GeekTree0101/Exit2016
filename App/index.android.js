import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Nav from './app/page/Nav/Nav';

class App extends Component{

    render(){

      return(
        <Nav />
      );
    }
}


AppRegistry.registerComponent('App', () => App);
