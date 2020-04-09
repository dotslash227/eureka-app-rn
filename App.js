import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './src/screens/Auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/routers/Auth';
import AppStack from './src/routers/AppStack';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render(){
    if(this.state.isLoggedIn){
      return <AppStack />
    }
    else{
      return  <AuthNav />
    }
  }

  // AppStack -> Is the main app's navigation
  // AuthNav -> Is the app's authentication stack.

}

export default App;