import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Home } from '../pages/Home';
import { SMod } from '../pages/SMod';
import { PMod } from '../pages/PMod';
import { QRcode } from '../pages/QRcode';

enableScreens();

const stackRoutes = createSharedElementStackNavigator();


const AppRoutes = () => (
    <stackRoutes.Navigator
        //headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: '#fff'
            },
        }}
    >
        
        <stackRoutes.Screen 
            name="Home"
            component={Home}
            options={{
                headerShown: false
                }
            }
        />

        <stackRoutes.Screen 
            name="SMod"
            component={SMod}
            options={{
                title: 'Novo Produto',
                headerStyle: {
                  backgroundColor: '#4B7DFE',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center'
            }}
        />

        <stackRoutes.Screen 
            name="PMod"
            component={PMod}
            options={{
                title: 'Novo Produto',
                headerStyle: {
                  backgroundColor: '#4B7DFE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }}
        />
        <stackRoutes.Screen 
            name="QRcode"
            component={QRcode}
        />
     
    </stackRoutes.Navigator>
)


export default AppRoutes;
