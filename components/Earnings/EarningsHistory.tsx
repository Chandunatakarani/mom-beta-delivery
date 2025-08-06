import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Svg, Line } from 'react-native-svg';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import apiClient from '../../utils/apiClient';
import useWeekEarnings from '../../Hooks/useWeekEarnings';
import { last8Weeks } from '../../Hooks/earningHooks';

const { width } = Dimensions.get('window');
const {height} = Dimensions.get('window');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWxpdmVyeUJveUlkIjoiNjgzNTU2ZTc2NjA1M2VjYTg5ZTBlZTQwIiwiaWF0IjoxNzQ4NDIyMTkxfQ.lQkEEDttODY8-xL8OI_vao3TMFi2K1j-YeuVwAOKacg"



const EarningsHistory = ({data ,totalEarning}) => {

  const weeks = last8Weeks()
  console.log(weeks[1])
  const {weekEarnings} = useWeekEarnings({startingDate:weeks[1].start , endingDate:weeks[1].end})

  
  
  return (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>This Week 20 Dec 2024</Text>
      <Image
        source={require('../../assets/images/Earnings/coin.png')}
        style={styles.image}
      />
    </View>

    <View style={styles.amountRow}>
      <Text style={styles.amount}>₹ {totalEarning?totalEarning:0}</Text>
      <Text style={styles.lastWeek}>Last Week ₹ {weekEarnings??0}</Text>
    </View>

    <Svg height="2" width={width * 0.9} style={styles.divider}>
      <Line x1="0" y1="1" x2={width * 0.9} y2="1" stroke="grey" strokeWidth="2" />
    </Svg>

    <TouchableOpacity style={styles.footer} onPress={()=> router.push('/Earnings/weekearnings')}>
      <Text style={styles.register}>See Earnings History {'>'}</Text>
    </TouchableOpacity>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    borderRadius: 20,
    backgroundColor: '#ACD9D4',
    padding: 20,
    alignSelf: 'center',
    height: height * 0.27
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    color: 'black',

  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    color: 'grey',
  },
  amountRow: {
    marginTop: 10,
  },
  amount: {
    fontWeight: '600',
    fontSize: 24,
    color: '#007E71',
  },
  lastWeek: {
    fontWeight: '400',
    fontSize: 16,
    color: '#007E71',
    marginTop: 4,
  },
  divider: {
    marginTop: 30,
    alignSelf: 'center',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  register: {
    color: '#00A99D',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EarningsHistory;