import React from "react";
import { Text, View, StyleSheet,  ScrollView, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

import Activity from "../../components/orders/orderActivity";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import { navigate } from "expo-router/build/global-state/routing";
export default function OrderHistoryScreen() {

  
const {orderId,createdAt,status} = useLocalSearchParams();
 
  return (
    <SafeAreaView style={styles.screen}>
      <View style={{backgroundColor:'#D0E8E6',height:"100%"}}>
        <View>
            <View style={{flexDirection:'row', gap:10,backgroundColor:'white',padding:10}}>
            <Ionicons name="chevron-back" size={24} color="black" onPress={()=>router.back()} />
            <Text style={{fontSize:20}}>Order Details</Text>
            </View>
        </View>
        <ScrollView >
          <Text style={{margin:15,fontSize:14,fontWeight:600}}>Ordered at {createdAt}</Text>
          <View style={styles.timeBox}>
            
            <View style={styles.dataContainer}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.time}>{createdAt}</Text>
              <Text style={{marginLeft:12, backgroundColor:'#00897B33',borderRadius:20,padding:5, color:"#00a99d"}}>{status}</Text>
              </View>
              <Text style={styles.orderDetails}>Order: {orderId}</Text>
              <View style={styles.CODcontainer}>
              <Text style={styles.COD}>COD</Text>
             
              </View>
            </View>
            <View>
            </View>
          </View>
       
      <Text style={{padding:20, fontWeight:'700', color:'#676767',fontSize:16,justifyContent:'center'}}>Order Activity</Text>
      <Activity createdAt={createdAt}/>

      <TouchableOpacity onPress={()=> router.push('./momhelp')}>
      <View style={{height:43,borderRadius:20,borderWidth:1,borderColor:"red", backgroundColor:'white',marginTop:50,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:'10',margin:15}}>
      <Entypo name="help-with-circle" size={24} color="red" />
    
      
        <Text style={{justifyContent:'center',textAlign:'center',paddingVertical:6}}>
      
      Help? </Text>
      </View>
      
      </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
  btn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    color: '#676767'
  },
  dataContainer: {
    paddingLeft: 8,
  },
  timeBox: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    margin:10
  },
  time: {
    fontSize: 14,
    color: '#676767',
    fontWeight: '700',
  },
  orderDetails: {
    fontWeight: '400',
    fontSize: 14,
    color: '#676767',
  },
  CODcontainer:{
    flexDirection:'row',
    gap:8,
  },
  COD: {
    fontWeight:700,
    marginTop: 7,
    width: 40,
    height: 25,
    backgroundColor: '#8C8D8D33',
    borderRadius: 27,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
  },
  RTO: {
    fontWeight:700,
    color:'red',
    marginTop: 7,
    width: 40,
    height: 25,
    backgroundColor: '#00897B33',
    borderRadius: 27,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    marginLeft:3
  },
});
