import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

const authStack = createStackNavigator();

function AuthNav() {
    return(
        <NavigationContainer>
            <authStack.Navigator>
                <authStack.Screen name="Login" component={LoginScreen} />
                <authStack.Screen name="Signup" component={SignupScreen} />
            </authStack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNav;