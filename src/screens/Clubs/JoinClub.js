import React from 'react';
import {Content, Container, Grid, Row, Col, Icon, Picker, Item, Form, Label, List, ListItem, Left, Body, Right, Thumbnail, Button} from 'native-base';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import HeaderBar from "../../components/HeaderBar";
import axios from 'axios';
import {connect} from 'react-redux';


// Screen to allow a user to join a club
// ToDo: Actions for the Join Now Button

class JoinClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            selectedCategoryId:'',
            clubs:[]
        }        
    }

    componentWillMount(){
        // When the component/screen loads, categories list has to be fetched from the server
        // and displayed
        let query = `
        query{
            allCategories{
                id, name
            }
        }
        `
        axios({
            method: "post",
            url: "http://localhost:8000/graphql",
            data: {"query":query}
        })
        .then((response)=>{
            let categories = response.data.data.allCategories;
            this.setState({categories});
        })
        .catch((error)=>console.log(error));
    }

    // Start of method to fetch new clubs on the basis of new picker input
    fetchClubs(){
        let query = `
        query{
            clubs:clubsBycategory(categoryId:${this.state.selectedCategoryId}){
              name, id, creator{username}
            }
        }
        `        
        console.log(query);
        axios({
            method:"post",
            url:"http://localhost:8000/graphql",
            data: {"query":query}
        })
        .then((response)=>{
            let clubs = response.data.data.clubs;
            this.setState({clubs}, ()=>console.log(this.state.clubs));
        })
        .catch((error)=>console.log(error));
    }
    // End of method to to fetch new club list

    handlePickerInput(categoryId){
        // Method to handle the picker input
        this.setState({selectedCategoryId:categoryId}, ()=>this.fetchClubs());        
    }    

    showJoinButton(clubdId){
        // Method to show a join button for a club
        // The method will check if there is a request pending or not for the same club and user
        // and then show a button with a text accordingly
        // Problem: The text is not appearing, a check is being failed and not working
        // Have to see that and fix it.

        const {id} = this.props.auth;
        let status = "";
        let query = `
        query{
            status:joinStatus(clubId:${clubdId}, senderId:${id}){
              status
            }
          }
        `
        axios({
            method:"post",
            url:"http://localhost:8000/graphql",
            data:{"query":query}
        })
        .then((response)=>{
            console.log(response.data.data);            
            status = response.data.data.status.status;                                    
        })
        .catch((error)=>console.log(error));
        if(status=="showjoin"){
            return(
                <Button 
                    block 
                    style={styles.joinButton} 
                    small bordered danger 
                    onPress={()=>this.handleJoinButton(clubId)}
                >
                    <Text style={{color:"black"}}>Join</Text>
                </Button>
            )                
        }
        else{
            return(
                <Button 
                    block 
                    disabled
                    style={styles.joinButton} 
                    small 
                    // onPress={()=>this.handleJoinButton(item.id)}
                >
                    <Text style={{color:"white"}}>{status}</Text>
                </Button>
            )
        }
    }

    handleJoinButton(clubId){
        // Method to handle the join button click for a club        
        const {id} = this.props.auth;
        let query = `
        mutation{
            joinRequest:createClubJoinrequest(clubId:${clubId}, senderId:${id}){
              joinRequest{
                id, sender{id, username}
              }
            }
          }
        `        
        axios({
            method:"post",
            url: "http://localhost:8000/graphql",
            data: {"query":query}
        })
        .then((response)=>{
            console.log(response);
            if(response.data.errors) alert(response.data.errors[0].message);
            else alert("Succesfull request has been sent to the admin and creator of this club");
        })
        .catch((error)=>console.log(error));
    }

    render(){
        return(
            <Container>         
                <HeaderBar title="Join A Club" back {...this.props} />
                <Content padder>                                        
                    <Form>
                        <Item picker>
                            <Label>
                                Select A Category
                            </Label>
                            {/* Picker takes list from state.categories, that will come during componentWillMount */}
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{width:"66%"}}                                    
                                placeholder="Choose One"
                                placeholderStyle={{color:"white"}}
                                placeholderIconColor={{color:"white"}}
                                selectedValue={this.state.selectedCategoryId}
                                onValueChange={this.handlePickerInput.bind(this)}
                            >
                                {(this.state.categories).map((item)=>{
                                    return <Picker.Item label={item.name} value={item.id} key={item.id} />
                                })}
                            </Picker>
                        </Item>
                    </Form>
                    <View style={{marginTop:20}}>                        
                        <Text style={styles.infoText}>
                            Please select a category from the above dropdown. List of clubs will appear below.
                        </Text>
                        <List>                                                    
                            {this.state.clubs.map((item)=>{
                                return(
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail 
                                                source={{uri:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/eb/eb2abf6a3f63074148d4d71ca2a7f01dfc0d66ef_full.jpg"}} 
                                            />
                                        </Left>
                                        <Body>
                                            <Text style={{fontSize:12}}>Name of the Club : {item.name}</Text>
                                            <Text style={{fontSize:12}}>Club Creator: {item.creator.username} </Text>                                            
                                        </Body>
                                        <Right style={{borderBottomWidth:0}}>                                            
                                            {this.showJoinButton(item.id)}                                            
                                        </Right>
                                    </ListItem>
                                )
                            })}
                        </List>                        
                    </View>
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

const styles = StyleSheet.create({
    joinButton:{
        padding:10, 
        marginTop:8
    },
    infoText:{
        marginTop:5, 
        justifyContent:"center", 
        alignSelf:"center", 
        borderBottomColor:"black", 
        borderBottomWidth:1, 
        marginBottom:10
    },
    backgroundImage:{        
        flex: 1,
        resizeMode: "cover",        
        opacity: 0.85
    },
    container:{
        backgroundColor:"black",
        opacity: 0.8
    }
})

export default connect(mapStateToProps)(JoinClub);