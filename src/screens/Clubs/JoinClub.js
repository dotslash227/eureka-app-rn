import React from 'react';
import {Content, Container} from 'native-base';
import {Text, View, ImageBackground} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';

class JoinClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {}        
    }

    render(){
        return(
            <Container>
                <Content>
                    <Text>This is a test screen</Text>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(JoinClub);