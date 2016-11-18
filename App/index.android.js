import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './app/page/home/home';


class App extends Component{

    render(){

      return(
        <Home/>
      );
    }
}


AppRegistry.registerComponent('App', () => App);
