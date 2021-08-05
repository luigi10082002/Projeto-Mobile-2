import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Home } from '../pages/Home';
import { SMod } from '../pages/SMod';
import { PMod } from '../pages/PMod';
enableScreens();

const stackRoutes = createSharedElementStackNavigator();


const AppRoutes = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: '#fff'
            },
        }}
    >
        
        <stackRoutes.Screen 
            name="Home"
            component={Home}
        />

        <stackRoutes.Screen 
            name="SMod"
            component={SMod}
        />

        <stackRoutes.Screen 
            name="PMod"
            component={PMod}
        />

    </stackRoutes.Navigator>
)


export default AppRoutes;