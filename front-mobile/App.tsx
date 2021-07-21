import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import * as Updates from "expo-updates";
import Routes from './src/routes';

const App: React.FC = () => {
	/*
	async function checkUpdates() {
		const update = await Updates.checkUpdatesAsync();
		if(update.isAvailable) {
			await Updates.fetchUpdateAsync();
			await Updates.reloadAsync();
		}
	}
	*/
	
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default App;