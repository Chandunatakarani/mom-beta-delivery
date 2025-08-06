import { convertDayToName, covertMonthsToNames } from '../../Hooks/earningHooks';
import usePayoutWeekly from '../../Hooks/payoutWeekly';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import PayoutBreakdown from '../../components/Earnings/Payout_Breakdown'
import Transaction from '../../components/Earnings/TransactionDetails'


const WeekEarnings = () => {

  const {start , end} = useLocalSearchParams()
  console.log("this is earnings" , start,  end)

  const handleHelp = () => console.log('Help pressed');
  const handleWeekDropdown = () => console.log('Week dropdown pressed');
  
  const {weekPayouts, data, loading, error } = usePayoutWeekly({startingDate:start , endingDate:end})
  
  const AverageEarnings = weekPayouts/7

 

  // if(loading) return <LoadingScreen/>

  if(!data) return
   <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
    <Text style={{fontWeight:"bold" , fontSize:24 , textAlign:"center" , color:"gray"}}>No Earning this week</Text>
  </View>


    // const noOfOrders = data.earnings.length
    console.log("this is from daily earning" , weekPayouts)



   const formatedOrderse = ()=>{
  const {orders} = data 
  const formattedData = orders.map((item)=>{
    const dateObj = new Date(item.createdAt)
    return {
      date:`${convertDayToName(dateObj.getDay()).slice(0,3)},${dateObj.getDate()} ${covertMonthsToNames(dateObj.getMonth())}`,
      amount:item.total_earning
    }
  })
  return formattedData
}

  
  return (
    <ScrollView>

       <View style={styles.container}>
      <View style={styles.header}>
        {/* <View style={ styles.head}> */}
        <Text style={styles.headerText}> Week 19 </Text>
        <Text style={styles.dateRange}> 05 May – 11 May </Text>
        </View>
        {/* <TouchableOpacity onPress={handleWeekDropdown}>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity> */}
      {/* </View> */}

      <View style={styles.earningsCard}>
        <Text style={styles.earnedText}>We've credited</Text>
        <Text style={styles.amount}>₹{weekPayouts?weekPayouts:0}</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>to your account</Text>
            <Text style={styles.value}>{data?data.length:0}</Text>
          </View>
          {/* <View style={styles.summaryItem}>
            <Text style={styles.label}>Daily Average</Text>
            <Text style={styles.value}>₹{AverageEarnings.toFixed(2)}</Text>
          </View> */}
        </View>
        <Image
          source={require('../../assets/images/Earn.png')}
          style={styles.earnImage}
        />
      </View>


      <PayoutBreakdown></PayoutBreakdown>
      <Transaction></Transaction>
    </View>

    </ScrollView>
   
  );
};

export default WeekEarnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E8E6',
    padding: 16,
    marginVertical:70
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    // flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },

  dateRange: {
    fontSize: 14,
    color: '#666',
  },
  dropdownIcon: {
    fontSize: 18,
    color: '#666',
  },
  earningsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    position: 'relative',
  },
  earnedText: {
    fontSize: 16,
    color: '#565656',
  },
  amount: {
    color: '#BF2424',
    fontSize: 48,
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryItem: {
    alignItems: 'center',

  },
  label: {
    fontSize: 14,
    color: '#565656',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  earnImage: {
    width: 150,
    height: 100,
    position: 'absolute',
    right: 20,
    top: 50,
    
  },
  earningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#565656',
  },
  earningItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#565656',
  },
  orders: {
    // color: '#666',
    marginTop: 4,
    color:'#4E4E4E',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
});