
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import { MD3LightTheme, Provider as PaperProvider, Title } from 'react-native-paper';
const Stack = createNativeStackNavigator();
import { LogBox } from 'react-native';
import Expense from './src/pages/Expenses';
import Revenue from './src/pages/Revenues';
import ExpensesNew from './src/pages/Expenses/new';
import RevenuesNew from './src/pages/Revenues/new';
import LaunchNew from './src/pages/launch/new';
import Fabio from './src/pages/user/fabio';
import Flavia from './src/pages/user/flavia';
import RelatorioFabio from './src/pages/user/relatorioFabio';
import RelatorioFlavia from './src/pages/user/relatorioFlavia';
import Momento from './src/pages/moments';
import MomentNew from './src/pages/moments/new';
import SysOnline from './src/pages/Home/online';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


function App() {


  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#512da8',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };



  return (

    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#512da8' },
          }}>
          <Stack.Screen options={{
            title: 'Controle Despesa'
          }} name="Home" component={Home} />
          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="Expense" component={Expense} />
          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="Revenue" component={Revenue} />
          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="ExpensesNew" component={ExpensesNew} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="RevenuesNew" component={RevenuesNew} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="LaunchNew" component={LaunchNew} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="Fabio" component={Fabio} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="Flavia" component={Flavia} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="RelatorioFabio" component={RelatorioFabio} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="RelatorioFlavia" component={RelatorioFlavia} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="Momento" component={Momento} />

          <Stack.Screen
            options={{
              title: 'Voltar'
            }}
            name="MomentNew" component={MomentNew} />

          <Stack.Screen
            options={{
              headerShown: false
            }}
            name="SysOnline" component={SysOnline} />



        </Stack.Navigator>

      </PaperProvider>
    </NavigationContainer>


  );
}

export default App;



