import React from 'react';
import Routes from './src/Routes';
import {StatusBar} from 'react-native';

const App = ()=> (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
        <Routes/>
    </>
);

export default App;
