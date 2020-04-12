import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Form, Input, Label, Item, Content, Container} from 'native-base';
import HeaderBar from "../../components/HeaderBar";
import axios from "axios";

// Screen to handle the signup of a new user
// TOdO: After signup, should redirect to a new page where a message is displayed that 
// the account gets activated when the user clicks on the link in email

class SignupScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            errors: []
        }
    }

    handleInput(data, dataType){    
        // The method takes into two parameters
        // InputID, which should correspond to the state variable and the data input            
        switch(dataType){
            case 'firstName':
                this.setState({firstName:data});
                break;    
            case 'lastName':
                this.setState({lastName:data});
                break;
            case 'username':
                this.setState({username:data});
                break;
            case 'email':
                this.setState({email:data});
                break;
            case 'password':
                this.setState({password:data});
                break;
            default:
                console.log("wrong option selected");
                break;
        }        
    }

    handleSubmit(){
        // Method to handle the signup form action
        // Uses graphql to communication with the server
        // Acceptable return paramters: profile{coins, etc.. user{id, firstName, lastName, email, the typical django fields}}
        // Please refer to the baackend schema before asking for data from graphql


        // TOdO: Redirection to message to be done and configuration with Redux, if necessary.

        alert("Your form is being submitted");
        const {firstName, lastName, email, username, password} = this.state;        
        let data = {"query" : `
            mutation{
                newUser: signup(
                    firstName:"${firstName}", lastName: "${lastName}",
                    email:"${email}", username:"${username}",
                    password:"${password}"
                ){
                    profile{
                        user{id, username}
                    }
                }
            }
        `}         
        axios({
            method: 'post',
            url: 'http://localhost:8000/graphql',
            data: data
        })
        .then((response)=>console.log(response))
        .catch((error)=>console.log(error));        
    }

    render(){
        return(
            <Container>
                <HeaderBar title="Signup" back {...this.props} />
                <Content padder>
                    <Text style={{marginBottom:10,textAlign:"center"}}>Please fill up the form below, all fields are compulsory. You will be sent
                        an confirmation email, to confirm your identity.
                    </Text>
                    <Form>
                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input 
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "firstName")}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Last Name</Label>
                            <Input 
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "lastName")}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input 
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "username")}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Email Address</Label>
                            <Input 
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "email")}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input 
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(data)=>this.handleInput(data, "password")}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Re-enter Password</Label>
                            <Input 
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}                                
                            />
                        </Item>
                    </Form>
                    <Button style={styles.signupButton} block onPress={()=>this.handleSubmit()}>
                        <Text style={styles.signupButtonText}>Signup</Text>
                    </Button>
                    <Text style={{marginTop:10,textAlign:"center", fontSize:12}}>
                        By pressing the submit button, you accept our Terms and Conditions, available on our website at Eureka Quiz App Website.
                    </Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    signupButtonText:{
        color: "white"
    },
    signupButton:{
        marginTop:20
    }
})

export default SignupScreen;