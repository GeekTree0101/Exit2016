import React, {Component} from "react";
import { Text, View, Image , PanResponder} from "react-native";
import styles  from "./../../../android.style.js";

export default class Animate extends Component{

    constructor(props){
        super(props);
        this.state = {
            X : 100,
            Y : 100,
            aX : 0,
            aY : 0
        }
        
    }

    componentWillMount(){
        /**
         *  gestureHandlers
         *  event : nativeEvent
         *  1. changedTouches : touch log array
         *  2. identifier : touch id
         *  3. locationX, locationY : touch element standard position
         *  4. pageX, pageY : screen standard position
         *  5. target : touched element id 
         *  6. timstamp : touched time / using at velocity
         *  7. touches : touch array
         */
        this._PanResponder = PanResponder.create({
            onStartShouldSetPanResponder : () => true,
            onMoveShouldSetPanResponder : () => true,
            onPanREsponderGrant : () => {
                console.log("Pan start");
            },
            onPanResponderMove : (e, touch) => {
                
                console.log(touch.moveX + ":" + touch.moveY);
                
                this.setState({
                    aX : touch.moveX - 100,
                    aY : touch.moveY - 100
                })
                
            },
            onPanResponderRelease : () => {
                console.log("Pan Release");
            },
            onPanResponderTerminate : () => {
                console.log("Pan Terminate");
            }

        })
        this.gestureHandlers = {
            onStartShouldSetResponder : () => true,
            onMoveShouldSetResponder : () => true,
            onResponderGrant : () => {console.log("gestureHandlers start");},
            onResponderMove : (e) => {
                var evt = e.nativeEvent;
                this.setState(
                    {
                        X : evt.pageX, 
                        Y : evt.pageY
                    }
                )
            },
            onResponderRelease : () => {
                console.log("gestureHandlers stop");
            }
        }
    }
    render(){

        return(
            <View style={styles.AnimationView}>
                <Image source={require("./img/react.png")}
                       style={{
                               transform :[{translateX : this.state.X},
                                           {translateY : this.state.Y}],
                               width :100,
                               height : 100
                        }}
                        {...this.gestureHandlers} //gestureHandlers
                />
                <Image source={require("./img/react.png")}
                       style={{
                               transform :[{translateX : this.state.aX},
                                           {translateY : this.state.aY}],
                               width :100,
                               height : 100
                        }}
                        {...this._PanResponder.panHandlers} //gestureHandlers
                />                
            </View>
        );
    }
}