import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './pages/Home';
import PMod from './pages/PMod';
import SMod from './pages/SMod';
import QRcode from './pages/QRcode';

import TabNavi from './tabRoutes/TabNavi';

const screen = createStackNavigator ({
    Home: {
      screen: Home
    },
    Módulo1: {
      screen: PMod
    },
    Módulo2: {
      screen: SMod
    },
    QRcode: {
      screen: QRcode
    },
    TabNavi
});

const RoutePages = createAppContainer(screen);

export default RoutePages;

