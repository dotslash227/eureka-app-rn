import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';

const appNavStack = createStackNavigator();

function AppStack() {
    return(
        <NavigationContainer>
            <appNavStack.Navigator>
                <appNavStack.Screen name="Home" component={HomeScreen} />
            </appNavStack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;