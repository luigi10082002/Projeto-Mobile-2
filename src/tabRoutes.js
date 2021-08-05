import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Home from './pages/Home';
import settings from './components/settings';
import historico from './components/historico';

const TabNavi = createMaterialBottomTabNavigator({
  Módulos: { 
    screen: Home 
  },
  Histórico: { 
    screen: historico 
  },
  Settings: { 
    screen: settings 
  },
});

export default TabNavi;
