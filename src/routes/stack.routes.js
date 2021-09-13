import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Details } from '../pages/details'
import Intro from '../pages/intro';
import { TabNavi } from './TabNavi';
import { SMod } from '../pages/SMod';
import { PMod } from '../pages/PMod';
import { QRcode } from '../pages/QRcode';

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
            name="Intro"
            component={Intro}
        />

        <stackRoutes.Screen 
            name="Home"
            component={TabNavi}
        />

        <stackRoutes.Screen 
            name="SMod"
            component={SMod}           
        />

        <stackRoutes.Screen 
            name="PMod"
            component={PMod}            
        />
        
        <stackRoutes.Screen 
            name="QRcode"
            component={QRcode}
            options={{
                headerShown: false
                }
            }
        />
     
    </stackRoutes.Navigator>
)


export default AppRoutes;
