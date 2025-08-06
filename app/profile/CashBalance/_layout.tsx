import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CashBalance from './CashBalance';
import PastDeposite from './PastDeposite';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import BackNavigation from '../../../components/BackNavigation';
import Help from '../../../components/help/Help';
import { COLORS } from '../../../constants/COLORS';

const Tab = createMaterialTopTabNavigator() 
export default function _layout() {

    const Stack = createNativeStackNavigator()

    function TopBarTabs(){
        return <Tab.Navigator id={undefined} screenOptions={{
            tabBarActiveTintColor:COLORS.primary,
            tabBarInactiveTintColor:"black",
            tabBarIndicatorStyle:{backgroundColor:COLORS.primary},
            tabBarLabelStyle:{fontWeight:"bold"},
            sceneStyle:{backgroundColor:COLORS.secondary}
        }}>
        <Tab.Screen name='Cash Balance' component={CashBalance}/>
        <Tab.Screen name='Past Deposite' component={PastDeposite}/>
    </Tab.Navigator>
    }

  return (
    <>
       <Stack.Navigator id={undefined} screenOptions={{headerShown:true,}}>
        <Stack.Screen name='TopBarTabs'  component={TopBarTabs} options={{
            headerLeft:()=><BackNavigation/> ,
            title:"Cash Balance",
            headerRight:()=><Help/>,
            headerTitleStyle: {
              color: '#00a99d',
              fontWeight: 'bold', 
              fontSize: 18,       
            },
        }} />
       </Stack.Navigator>
    </>
  )
}