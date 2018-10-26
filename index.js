/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const url="http://104.196.11.112:8080"; 

export default url;
AppRegistry.registerComponent(appName, () => App);
