import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Help from '../../../components/help/Help'
import BackNavigation from '../../../components/BackNavigation'
import {COLORS} from '../../../constants/COLORS'

export default function _layout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='WrongActions' options={{title:"Wrong Action Details" , headerRight:()=><Help/> , headerLeft:()=><BackNavigation/> , contentStyle:{backgroundColor:COLORS.secondary}}}/>
        <Stack.Screen name='WrongActionDetails' options={{title:"Wrong Action Details" , headerRight:()=><Help/> , headerLeft:()=><BackNavigation/> , contentStyle:{backgroundColor:"white"}}}/>
    </Stack>
  )
}

