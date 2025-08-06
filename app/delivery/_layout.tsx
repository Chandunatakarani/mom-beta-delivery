import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Help from '../../components/help/Help'
import { COLORS } from '../../constants/COLORS'
import { MaterialIcons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="pickup"
        options={{
          title: 'Pickup',
          headerRight: () => <Help />,
          headerLeft: () => null, 
        }}
      />
      <Stack.Screen
        name="deliver"
        options={{
          title: 'Delivery',
          headerRight: () => <Help />,
          
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          title: 'Order',
          headerRight: () => <Help />,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => router.replace('/delivery/deliver')}
            >
              <MaterialIcons name="arrow-back" size={24} color="#00a99d" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}