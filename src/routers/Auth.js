import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import StartClub from '../screens/Clubs/StartClub';

const authStack = createStackNavigator();
const appStack = createStackNavigator();

// This is the navigation stack for the Auth screens using the
// latest react navigation library

function AppNav() {
    return(
        <appStack.Navigator headerMode="none">
            <appStack.Screen name="Home" component={HomeScreen} />
            <appStack.Screen name="startClub" component={StartClub} />
        </appStack.Navigator>
    )
}


function AuthNav() {
    return(
        <NavigationContainer>
            <authStack.Navigator initialRouteName="Login" headerMode="none">
                <authStack.Screen name="Login" component={LoginScreen} />
                <authStack.Screen name="Signup" component={SignupScreen} />
                <authStack.Screen name="App" component={AppNav} />
            </authStack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNav;