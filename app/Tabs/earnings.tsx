import { router, useLocalSearchParams } from 'expo-router';
// import RateCard from '@/components/Earnings/RateCard';
import EarningsHistory from '../../components/Earnings/EarningsHistory';
import PayoutHistory from '../../components/Earnings/PayoutsHistory';

import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
// import apiClient from '@/utils/apiClient';
import { ActivityIndicator } from 'react-native-paper';
import useWeekEarnings from '../../Hooks/useWeekEarnings';
import LoadingScreen from '../../components/LoadingScreen';
// import { last8Weeks } from '@/Hooks/earningHooks';
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWxpdmVyeUJveUlkIjoiNjgzNTU2ZTc2NjA1M2VjYTg5ZTBlZTQwIiwiaWF0IjoxNzQ4NDIyMTkxfQ.lQkEEDttODY8-xL8OI_vao3TMFi2K1j-YeuVwAOKacg"
const { width } = Dimensions.get('window');
const paddingHorizontal = width * 0.05;

const EarningsScreen = () => {


   function getCurrentWeekRange() {
           const today = new Date();
   
           // Set to start of day
           today.setHours(0, 0, 0, 0);
   
           // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
           const dayOfWeek = today.getDay();
   
           // Calculate how many days to subtract to get to Monday
           const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
   
           // Start of the week (Monday)
           const startOfWeek = new Date(today);
           startOfWeek.setDate(today.getDate() + diffToMonday);
   
           // End of the week (Sunday)
           const endOfWeek = new Date(startOfWeek);
           endOfWeek.setDate(startOfWeek.getDate() + 6);
           endOfWeek.setHours(23, 59, 59, 999); // set to end of day
   
           const startingWeek = startOfWeek.toISOString().split('T')[0]
           const endingWeek = endOfWeek.toISOString().split('T')[0]
   
           return { startingWeek, endingWeek };
       }
   
       const { startingWeek, endingWeek } = getCurrentWeekRange()
   
   
         const { data, weekEarnings , loading } = useWeekEarnings({ startingDate: startingWeek, endingDate: endingWeek });

         

         if(loading) return <LoadingScreen/>
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Text style={styles.heading}>Earnings</Text> */}
                <View style={styles.section}>
                    <EarningsHistory data={data} totalEarning={weekEarnings} />
                </View>

                <View style={styles.section}>
                    <PayoutHistory />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal,
        paddingVertical: 10,
    },
    section: {
        marginBottom: 30,
    },
});

export default EarningsScreen;
