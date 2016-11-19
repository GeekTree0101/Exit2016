import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Navigator } from 'react-native';

import Home from './../home/home';
import Playground from './../animation/ani';

export default class Nav extends Component{

    render(){

      return(
        <Navigator
          initialRoute = {{title : 'My initial Scene', index :0}}
          renderScene={(route, navigator) => {
            
            if(route.index < 3){
              
              return <MyScene title={route.title} 

                              onForward = {() => {
                                
                                const nextIndex = route.index + 1;
                                
                                navigator.push({
                                     title : 'Scene' +nextIndex,
                                     index : nextIndex
                                });
                               
                                }
                              }
                              
                              onBack = {() => {
                                if (route.index > 0){
                                       navigator.pop();
                                }
                               }
                             }
                      />
            }
            else if(route.index < 5){

                return <Playground />
            }
            else{
              
                return <Home />
            }
        }}
        />
      );
    }
}


class MyScene extends Component {

    static get defaultProps(){
        return {
            title : 'MySecene'
        };
    }

    render(){

        return(
            <View>
                <Text> Currend Scene :{this.props.title} </Text>
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text> Tap me to load the next scene </Text>
                </TouchableHighlight >
                <TouchableHighlight onPress={this.props.onBack} >
                    <Text> Tap me to go back </Text>
                </TouchableHighlight>        
            </View>
        )
    }
}