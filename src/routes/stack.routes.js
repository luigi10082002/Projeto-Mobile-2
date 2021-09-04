import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

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
            name="Home"
            component={TabNavi}
            options={{
                headerShown: false
                }
            }
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
