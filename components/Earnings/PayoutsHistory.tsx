import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { router } from 'expo-router';
// import PayoutHistoryScreen from '@/app/Earnings/payouthistory';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const PayoutHistory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Payouts</Text>
        <Image
          source={require('../../assets/images/Earnings/payoutsimage.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.subtitle}>Get paid every weekend & you can check your payouts here</Text>

      <Svg height="2" width={width * 0.9} style={styles.divider}>
        <Line x1="0" y1="1" x2={width * 0.9} y2="1" stroke="grey" strokeWidth="2" />
      </Svg>
      <TouchableOpacity onPress={() => router.push('/Earnings/payouthistory')}>
        <Text style={styles.historytxt}>Check Payouts History {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PayoutHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#ACD9D4',
    borderWidth: 1,
    padding: 16,
    alignSelf: 'center',
    width: width * 0.95,
    height: height * 0.27
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
    marginTop: 10,
  },
  historytxt: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#00A99D',
    marginTop: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  divider: {
    marginTop: 18,
    alignSelf: 'center',
  },
});