import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './src/screens/Auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/routers/Auth';
// Start Reducers Importing and other redux libraries
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {authReducer} from './src/reducers/authReducer';
// End reducers import

console.disableYellowBox = true;

// Some Redux Magic
const rootReducer = combineReducers({
  auth:authReducer
})
const store = createStore(rootReducer)
// End of redux magic


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render(){
    return(
      <Provider store={store}>
        <AuthNav />
      </Provider>    
    )    
  }

  // AppStack -> Is the main app's navigation
  // AuthNav -> Is the app's authentication stack.

}

export default App;