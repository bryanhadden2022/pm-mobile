/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';

function Root(props) {
    return <StoreProvider store={store}><App {...props} /></StoreProvider>
}

AppRegistry.registerComponent(appName, () => Root);
