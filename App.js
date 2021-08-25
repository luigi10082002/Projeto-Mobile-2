import React from 'react';

import Routes  from './src/routes';
import AsyncStorage  from '@react-native-async-storage/async-storage';

AsyncStorage.clear();
export default function App() {

    return (
        <Routes/>
    )
}
