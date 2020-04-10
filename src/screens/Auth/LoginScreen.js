import React from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import Background from "../../assets/bay.jpg";
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base';
import axios from "axios";
import {userLogin} from '../../actions/authActions';
import {connect} from 'react-redux';

// ToDo: Login button should be disabled by default
// And should only enable when the username and password is input

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            'username':'',
            'password': '',
            'loginFlag': true,
            'errors':[]
        }        
    }

    componentDidMount(){
        const {navigation} = this.props;
        if(this.props.auth.id) navigation.navigate("Home")
        (this.state.errors) && alert(this.state.errors);
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
        alert("We are trying to login. Please wait.");
        const {username, password} = this.state;
        let data = {
            "query": `
            mutation{
                user:login(username:"${username}", password:"${password}"){
                    profile{
                        user{id, username, firstName, lastName, email}
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
            let userData = response.data.data.user.profile.user;            
            this.props.userLogin(userData);            
            this.props.navigation.navigate("Home");
        })
        .catch((error)=>{
            let errors = error.message;
            this.setState({errors});
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

const mapStateToProps = (state) =>{
    return{
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        userLogin: (user)=>{
            dispatch(userLogin(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

