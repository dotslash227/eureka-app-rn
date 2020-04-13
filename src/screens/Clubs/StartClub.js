import React from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import {Container, Content, Form, Input, Label, Item, Button, Textarea, Picker, Icon, Left, Body, Right, Grid, Row, Col} from 'native-base';
import axios from "axios";
import {connect} from 'react-redux';

// Screen for adding a new club by an already logged In user
// UserID is stored in the global redux state (props.auth)

class StartClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            name:'',
            description:'',
            maxPlayers:'',
            selectedCategoryId:undefined
        }
    }

    componentWillMount(){
        // Fetching all categories from the backend
        let query = `
        query{
            allCategories{
                id, name
            }
        }
        `        
        axios({
            method:'post',
            url:'http://localhost:8000/graphql',
            data:{"query":query}
        })
        .then((response)=>{
            this.setState({categories:response.data.data.allCategories});
            console.log(this.state.categories);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    handleInput(data, dataType){
        // Dynamic input handler using switch statement
        // Accepts two parameters: data and datatype
        switch(dataType){
            case 'name':
                this.setState({name:data});
                break;
            case 'description':
                this.setState({description:data});
                break;
            case 'maxPlayers':
                this.setState({maxPlayers:data});
                break;
            default:
                console.log("no case found");
                break;
        }
    }

    handlePickerInput(categoryId){
        // Method to handle the picker input
        this.setState({selectedCategoryId:categoryId});        
    }

    handleSubmit(){
        // Method to handle the onPress event of the submit button

        // Query for the create club mutation
        let query = `
            mutation{
                club:createClub(
                description:"${this.state.description}, "name:"${this.state.name}", 
                userId:${this.props.auth.id}, categoryId:${this.state.selectedCategoryId}, maxPlayers:${this.state.maxPlayers}){
                    club{
                        id, name
                    }
                }
            }
        `
        axios({
            method:"post",
            url:"http://localhost:8000/graphql",
            data:{"query":query}            
        })
        .then((response)=>{            
            // In GraphQL, erros are passed into response.data.errors as multiple array's.
            if(response.data.errors) alert(response.data.errors[0].message); 
            else alert("Club has been created");             
        })
        .catch((error)=>{
            console.log(error);            
        })
    }

    render(){
        return(
            <Container style={styles.container}>
                <ImageBackground source={require("../..//assets/bay.jpg")} style={styles.backgroundImage}>
                    <Content padder>
                        <Grid style={styles.title}>
                            <Row>
                                <Col size={1}>
                                    <Icon name="arrow-back" onPress={()=>this.props.navigation.goBack()} />
                                </Col>
                                <Col size={4}>
                                    <Text style={styles.h1}>Start a New Club</Text>    
                                </Col>
                            </Row>                            
                        </Grid>
                        <Form>
                            <Item stackedLabel>
                                <Label style={styles.auxText}>Name of the Club</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(data)=>this.handleInput(data,"name")}
                                />
                            </Item>
                            <Item picker>                                
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{width:undefined}}                                    
                                    placeholder="Select a Category for the Club"
                                    placeholderStyle={{color:"white"}}
                                    placeholderIconColor={{color:"white"}}
                                    selectedValue={this.state.selectedCategoryId}
                                    onValueChange={this.handlePickerInput.bind(this)}
                                >
                                    {this.state.categories.map((item)=>{
                                        return <Picker.Item label={item.name} key={item.id} value={item.id} />
                                    })}
                                </Picker>

                            </Item>
                            <Item stackedLabel>
                                <Label style={styles.auxText}>Tell us about the club</Label>
                                <Textarea rowSpan={5} placeholder="Enter Description here" />
                            </Item>
                            <Item stackedLabel>
                                <Label style={styles.auxText}>Maximum number of players allowed</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(data)=>this.handleInput(data,"maxPlayers")}
                                />
                            </Item>
                        </Form>
                        <Button block style={styles.button} onPress={()=>this.handleSubmit()}>
                            <Text>Start A New Club</Text>
                        </Button>
                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        marginTop:20
    },
    auxText:{
        color:"black",
        fontSize:15
    },
    title:{
        borderBottomColor:"white",
        borderBottomWidth:1
    },
    h1:{
        color:"white",
        fontSize: 30,                
        marginTop:-5
    },
    backgroundImage:{        
        flex: 1,
        resizeMode: "cover",        
        opacity: 0.5
    },
    container:{
        backgroundColor:"black",
        opacity: 0.8
    }
})

// Start Some Redux Magic
const mapStateToProps = (state) =>{
    return{
        auth:state.auth
    }
}
// End of some redux magic

export default connect(mapStateToProps)(StartClub);