import React from 'react';
import {Text, ImageBackground, StyleSheet, View, Image} from 'react-native';
import {Content, Container, Body, Left, Right, Grid, Row, Col, Icon, Card, CardItem} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';

// A lot of work has to be done on this screen after redux configuration
// Main homepage, styling done, functioanlities and integration with
// API's have to be done for this screen

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quizes:[]
        }
    }

    componentDidMount(){                
        let query = `
        query{
            quizes:newQuizesByUser(userId:1){
              id, name, club{name}
            }
          }
        `  
        axios({
            method:"post",
            url:"http://localhost:8000/graphql",
            data:{query:query}
        })
        .then((response)=>{
            this.setState({quizes:response.data.data.quizes});
        })  
        .catch((error)=>console.log(error))
    }

    render(){
        return(
            <Container style={styles.container}>                
                <ImageBackground source={require("../assets/rome.jpg")} style={styles.backgroundImage}>
                    <Content padder>
                        {/* Start of Top Profile and Logo Area */}
                        <Grid>
                            <Row>
                                <Left></Left>
                                <Body>
                                    <Image source={require("../assets/Bust.png")} style={{height:100, width:100, alignSelf:"center", marginBottom:-20}} />
                                </Body>                                
                                <Right>
                                    <Image source={require("../assets/Profile.png")} style={{height:50, width:50, marginBottom:-20}} />
                                </Right>
                            </Row>
                        </Grid> 
                        {/* End of Top Profile and Logo Area */}                           
                        {/* Start of heading title and filter icon */}
                        <Grid style={styles.headerSection}>                                
                            <Row>
                                <Col size={75}>
                                    <Text style={styles.h1}>Upcoming Quizzes</Text>
                                </Col>
                                <Col size={25}>
                                    <Icon type="FontAwesome" name="filter" style={styles.filterIcon} onPress={()=>alert("Filter icon pressed")} />
                                </Col>
                            </Row>
                        </Grid>
                        {/* End of heading title and filter icon */}
                        {/* Start of cards for showing upcming quizzes */}
                        <Content style={{maxHeight:400, marginBottom:35}}>
                            {(this.state.quizes).map((item,key)=>{
                                return(
                                    <Card style={{opacity:0.8}}>
                                        <CardItem style={styles.quizzesListCard}>
                                            <Body>
                                                <Text style={styles.cardText1}>{item.name}</Text>
                                                <Text style={styles.cardText2}>{item.club.name}</Text>
                                            </Body>
                                            <Right>
                                                <Text style={styles.cardText2}>1 Hr 20 mins</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                )
                            })}                                                        
                        </Content>     
                        {/*  End of upcoming quizz cards */}
                        {/* Start of last 2 buttons */}
                        <Grid>
                            <Row>
                                <Col onPress={()=>this.props.navigation.navigate("startClub")}>
                                    <View style={styles.actionHomeButton}>
                                        <Text style={styles.buttonTextActionHome}>Start A Club</Text>
                                    </View>
                                </Col>
                                <Col onPress={()=>this.props.navigation.navigate("joinClub")}>
                                    <View style={styles.actionHomeButton}>
                                        <Text style={styles.buttonTextActionHome}>Join A Club</Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                        {/* End of the button code */}
                    </Content>                    
                </ImageBackground>                                    
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    actionHomeButton:{
        alignSelf:"center", 
        opacity: 0.8, 
        backgroundColor:"white", 
        width:"90%", 
        padding:20, 
        textAlign:"center", 
        justifyContent:"center"
    },
    buttonTextActionHome:{
        color:"black", 
        fontSize:20, 
        textAlign:"center"
    },
    cardText1:{
        color:"white",
        fontSize: 20
    },
    cardText2:{
        color:"white",
        fontSize: 15
    },
    quizzesListCard:{
        backgroundColor:"black",
        opacity:0.9
    },
    filterIcon:{
        color:"white",
        fontSize:25,
        textAlign:"center",
        marginTop:10
    },  
    headerSection:{
        borderBottomWidth: 1,
        borderBottomColor: "white",
        paddingBottom:10,
        marginTop:60
    },
    h1:{
        fontSize:35,
        color:"white",
        textAlign:"center"
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

const mapStateToProps = (state) =>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(HomeScreen);