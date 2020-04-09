import React from 'react';
import {Text} from 'react-native';
import {Content, Container} from 'native-base';


// A lot of work has to be done on this screen after redux configuration

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Container>
                <Content>
                    <Text>This is the home</Text>
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;