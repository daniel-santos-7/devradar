import React from 'react';
import { Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Main from './pages/Main';
import Profile from './pages/Profile';


const stackNavigator = createStackNavigator({
    Main: {
        screen:Main,
        navigationOptions: {
            title: 'DevRadar'
        }
    },
    Profile: {
        screen:Profile,
        navigationOptions: {
            title: 'Perfil no Github'
        }
    },  
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:'#7D40E7'
        },
        headerTitleStyle: {
            fontFamily: Platform.select({ios:'Arial', android: 'Roboto'}),
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
    }
});

export default createAppContainer(stackNavigator);