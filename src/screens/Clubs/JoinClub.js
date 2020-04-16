import React from 'react';
import {Content, Container, Grid, Row, Col, Icon, Picker, Item, Form, Label, List, ListItem, Left, Body, Right, Thumbnail, Button, Input} from 'native-base';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import HeaderBar from "../../components/HeaderBar";
import axios from 'axios';
import {connect} from 'react-redux';
import {getStatus} from "../../services/joinclub";

// Screen to allow a user to join a club
// ToDo: Actions for the Join Now Button

class JoinClub extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            selectedCategoryId:'',
            clubs:[],
            name: ''
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
        const {name, selectedCategoryId} = this.state;        
        let query = "";
        // Query selectr on the basis  of whether name or category or both
        // is input
        // Todo: nothing to do now
        if (selectedCategoryId && !name){            
            query = `
            query{
                clubs:clubsBycategory(categoryId:${selectedCategoryId}){
                name,status(userId:${this.props.auth.id}), id, creator{id, username}
                }
            }
            `        
        }
        if (name && !selectedCategoryId){            
            query = `
            query{
                clubs:clubsBycategory(name:"${name}"){
                name,status(userId:${this.props.auth.id}), id, creator{id, username}
                }
            }
            `        
        }
        if(name && selectedCategoryId){            
            query = `
            query{
                clubs:clubsBycategory(categoryId:${selectedCategoryId}, name:"${name}"){
                name,status(userId:${this.props.auth.id}), id, creator{id, username}
                }
            }
            `        
        }
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

    renderClubs(){
        if(this.state.clubs.length > 0){
            return this.state.clubs.map((item, index)=>{                
                return (
                    <ListItem avatar key={item.id} style={{borderBottomColor:"white", borderBottomWidth:1, paddingBottom:10}}>
                        <Left>
                            <Thumbnail 
                                source={{uri:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/eb/eb2abf6a3f63074148d4d71ca2a7f01dfc0d66ef_full.jpg"}} 
                            />
                        </Left>      
                        <Body style={{borderBottomWidth:0}}>
                            <Text style={{fontSize:12, color:"white"}}>{item.name}</Text>
                            <Text style={{fontSize:12, color:"white"}}>Club owner: {item.creator.username}</Text>
                        </Body>
                        <Right style={{borderBottomWidth:0}}>
                            {this.joinButton(item, index)}
                        </Right>                  
                    </ListItem>
                )
            })
        }
        else if(!this.state.selectedCategoryId && !this.state.name){
            return(
                <Text></Text>
            )
        }        
        else return <Text style={styles.noClubText}>No Clubs Found</Text>
    }

    handleNameInput(text){
        // Method to handle name of the input
        this.setState({name:text}, ()=>this.fetchClubs());        
    }

    handlePickerInput(categoryId){
        // Method to handle the picker input
        this.setState({selectedCategoryId:categoryId}, ()=>this.fetchClubs());        
    }    

    joinButton(club, index){  
        // Method to show the join button dynamically, disabled or enabled
        // with custom text  on the basis of the club and the user's join status
        // Actions has to be taken on the admin or creator of the club end
        if(club.status=="ok"){
            return(
                <Button 
                    block 
                    style={styles.joinButton} 
                    small bordered danger 
                    onPress={()=>this.handleJoinButton(club.id, index)}
                >
                    <Text style={{color:"white"}}>Join</Text>
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
                >
                    <Text style={{color:"white"}}>{club.status}</Text>
                </Button>
            )
        }
    }

    handleJoinButton(clubId, index){
        // Method to handle the join button click for a club            
        const {id} = this.props.auth;
        const {clubs} = this.state;
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
            if(response.data.errors) alert(response.data.errors[0].message);
            else {                
                alert("Succesfull request has been sent to the admin and creator of this club");
                clubs[index].status = "Pending Request";
                this.setState({clubs});
            }
        })
        .catch((error)=>console.log(error));
    }

    render(){
        return(
            <Container style={styles.container}>   
                <ImageBackground source={require("../../assets/rome.png")} style={styles.backgroundImage}>                    
                    <Content padder style={styles.overlay}>
                        <HeaderBar title="Join A Club" back {...this.props} />
                        <Form>                                                        
                            <Item picker>                            
                                {/* Picker takes list from state.categories, that will come during componentWillMount */}
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{width:"80%", color:"white"}}
                                    placeholder="Choose A Category"
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
                            <Item>                            
                                <Input 
                                    placeholder="And / Or Enter name" 
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    placeholderStyle={{color:"white"}}
                                    style={{color:"white"}}
                                    onChangeText={(text)=>this.handleNameInput(text)}
                                />
                            </Item>                                                                                                         
                        </Form>
                        <View style={{marginTop:20}}>                        
                            <Text style={styles.infoText}>
                                Please select a category from the above dropdown. List of clubs will appear below.
                            </Text>
                            <List>                                                    
                                {this.renderClubs()}
                            </List>                        
                        </View>
                    </Content>
                </ImageBackground>
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
    noClubText:{
        textAlign:"center", 
        fontSize:20, 
        fontWeight:"bold", 
        marginTop:30,
        color: "brown"
    },
    joinButton:{
        padding:10, 
        marginTop:8,        
    },
    infoText:{
        marginTop:5, 
        justifyContent:"center", 
        alignSelf:"center", 
        borderBottomColor:"white", 
        borderBottomWidth:1, 
        marginBottom:10,
        color:"white",
        fontWeight:"bold"
    },
    backgroundImage:{                
        flex: 1,
        resizeMode: "cover",        
        opacity: 1
    },
    container:{
        // backgroundColor:"black",
        // opacity: 1.0         
    },
    overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
})

export default connect(mapStateToProps)(JoinClub);