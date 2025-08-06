import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
// import { screenWidht } from '@/constants/ScreenConfig'
// import { COLORS } from '@/constants/COLORS'

export default function CashBalance() {
  return (
    <View style={styles.header}>
    <View style={styles.cashBalanceContainer}>
      <Text>Cash Balance</Text>
      <Text style={styles.balance} >₹ 0</Text>
      <Text style={styles.limit}>Available Limit: 1,400</Text>
      <TouchableOpacity style={styles.depositeButton} >
        <Text>Deposite</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.imageContainer}>
        <Image source={{uri:"https://i.postimg.cc/2SNLBQSY/7ccde53a0912a8cd7bc989284fcc8b8c80d7ff27.png"}} width={220} height={220} />
        <Text style={styles.imageTextStyle}>No Pending Cash Orders</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    height:'100%',
    width:'100%',
  },
    cashBalanceContainer:{
        backgroundColor:"white",
        alignItems:"center",
        padding:20 ,
        marginVertical:10,
        gap:12,
        paddingBottom:30,
        marginRight:20,
        marginLeft:20,
        borderRadius:12,
        borderWidth:1,
        borderColor:'#00a99d',
    },
    balance:{
        fontSize:30 , 
        fontWeight:"bold",

    },
    limit:{
        fontSize:12,
    },
    depositeButton:{
        backgroundColor:'#00a99d' ,
        padding:12 , 
        paddingHorizontal:20,
        borderRadius:24

    },
    imageContainer:{
        flex:1, 
        // justifyContent:"center",
        alignItems:"center"
    },
    imageTextStyle:{
        fontWeight:"bold",
        fontSize:20
    }
})