import React from 'react';
import {Header, Body, Left, Right, Icon, Title} from 'native-base';
import {Text, StyleSheet} from 'react-native';

class HeaderBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Header style={styles.header}>
                <Left>
                    {(this.props.back) && <Icon name="arrow-back" style={styles.title} onPress={()=>this.props.navigation.goBack()} />}
                </Left>
                <Body>
                    <Title style={styles.title}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        color:"white",
    },
    header:{
        backgroundColor: "transparent",        
    }
})

export default HeaderBar;