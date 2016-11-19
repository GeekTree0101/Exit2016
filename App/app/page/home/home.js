import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';

import List from './../list/list';


//import stylesheet
import text from './../../stylesheet/text';
import view from './../../stylesheet/view';
import button from './../../stylesheet/button';


export default class Home extends Component {

    render(){

        return(
            /*
            <View style={[view.bgcolor, view.center]}>
                <Header text="What is React?" sub="2016.11.18 GeekTree0101" />
                <List /> 
            </View>
            */
            <Flex />
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

class Flex extends Component {

    constructor(props){
        super(props);
        this.state = {gText : ''};
    }

    setdata(data){

        this.setState({gText : data});
    }

    pressFunction(){
        console.log("pressed");
    }
    render(){

        return(
            <View style={{flex : 1}}>
                <View style={{flex : 0.1, backgroundColor : '#FF0000'}} >
                    <Password func={(data) => this.setdata(data)} />
                </View>
                <View style={{flex : 0.9, flexDirection : 'row'}}>
                    <View style={{flex : 0.8, backgroundColor : '#2A363B'}} >
                        <Password_output password = {this.state.gText} />
                        <ListViewTest />
                    </View>
                    <View style={{flex : 0.2, backgroundColor : '#FECEA8'}} />
                </View>
                <View style={{flex : 0.1, backgroundColor : '#FF847B'}} />
            </View>
        );
    }
}

class ListViewTest extends Component {

    constructor(props){
        super(props);
       
        const ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 != r2 });
       
        this.state = {
       
            dataSource : ds.cloneWithRows([
                'A','B','C','D'
            ])
        }

        console.log("dataSource", this.state.dataSource);
        console.log("ds",ds);

    }
    render(){

        return(
            <View style={{flex :1, paddingTop : 22}} >
                <ListView dataSource={this.state.dataSource}
                          renderRow = {(rowData) => <Text>{rowData} :test </Text>}
                />
            </View>    
        );
    }

}


class Password extends Component {

    constructor(props){
        super(props);
        this.state = {text : ''};
    }

    setup_text(text){

        this.setState({text});        
        this.props.func(text);
    }

    render(){

        return(
            <View style={{padding :10}} >
                <TextInput style = {{height : 40}} 
                placeholder="Input text"
                onChangeText = {(text) => this.setup_text(text)}
                />
            </View>
        );
        
    }
}

class Password_output extends Component {

    constructor(props){
        super(props);
        
    }

    render(){

        return(
            <View style={{padding : 10}} >
                <Text style = {{padding : 10, fontSize : 42, color : '#eee'}}>
                    {this.props.password.split('').map((text) => '*').join('')}
                </Text>
            </View>
        );
    }
}