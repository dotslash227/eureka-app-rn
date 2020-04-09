import React from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import Background from "../../assets/bay.jpg";
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base';
import axios from "axios";

// ToDo: Login button should be disabled by default
// And should only enable when the username and password is input

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            'username':'',
            'password': '',
            'loginFlag': true
        }        
    }

    handleInput(data, inputId){
        // The method takes into two parameters
        // InputID, which should correspond to the state variable and the data input
        switch(inputId){
            case 'username':
                this.setState({username:data});
                break;
            case 'password':
                this.setState({password:data});
                break;            
            default:
                console.log("wrong case input");
        }         
    }

    handleSubmit(){
        // Method to submit details for login and retrieve user's profile info
        // Uses GraphQL
        // ToDo: Connect it with Redux
        alert("trying to log in the user");
        const {username, password} = this.state;
        let data = {
            "query": `
            mutation{
                user:login(username:"${username}", password:"${password}"){
                    profile{
                        user{id, username}
                    }
                }
            }`            
        }        
        console.log(data);
        axios({
            method: 'post',
            url: 'http://localhost:8000/graphql',
            data: data
        })
        .then((response)=>{
            console.log(response);            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){      
        const {navigation} = this.props;  
        return(
            <Container>                
                <Content padder style={styles.loginScreen}>                    
                    <Form style={styles.loginForm}>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input 
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "username")} 
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry 
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                onChangeText={(data)=>this.handleInput(data, "password")} 
                            />
                        </Item>
                    </Form>
                    <Button block style={styles.loginButton} bordered onPress={()=>this.handleSubmit()}>
                        <Text>Login</Text>
                    </Button>
                    <Button block bordered success onPress={()=>navigation.navigate("Signup")}>
                        <Text>Signup</Text>
                    </Button>                                 
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({    
    loginForm:{
        marginTop: "50%"
    },
    loginButton:{
        marginTop:30,
        marginBottom:10
    }    
})

export default LoginScreen;

