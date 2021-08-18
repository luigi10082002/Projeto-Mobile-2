import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { TabNavi } from './TabNavi';
import { SMod } from '../pages/SMod';
import { PMod } from '../pages/PMod';
import { PQRcode } from '../pages/QRCode/PQRcode';
import { SQRcode } from '../pages/QRCode/SQRcode';

enableScreens();

const stackRoutes = createSharedElementStackNavigator();


const AppRoutes = () => (
        <stackRoutes.Navigator
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
                },
                headerTitleAlign: 'center'
            }}
        />
        
        <stackRoutes.Screen 
            name="PQRcode"
            component={PQRcode}
            options={{
                headerShown: false
                }
            }
        />

        <stackRoutes.Screen 
            name="SQRcode"
            component={SQRcode}
            options={{
                headerShown: false
                }
            }
        />
     
    </stackRoutes.Navigator>
)


export default AppRoutes;
