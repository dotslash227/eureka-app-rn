import React from 'react';
import {Header, Body, Left, Right, Icon, Title} from 'native-base';
import {Text} from 'react-native';

class HeaderBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Header>
                <Left>
                    {(this.props.back) && <Icon name="arrow-back" onPress={()=>this.props.navigation.goBack()} />}
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        )
    }
}

export default HeaderBar;