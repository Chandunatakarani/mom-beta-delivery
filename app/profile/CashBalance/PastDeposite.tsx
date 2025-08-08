import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../constants/COLORS'


const data = [
    {
        id: 1,
        date: "12 May 2025",
        time: "10:00 AM",
        amount: 1440,
        orders: 7
    },
    {
        id: 2,
        date: "12 May 2025",
        time: "10:00 AM",
        amount: 1440,
        orders: 7
    },
    {
        id: 3,
        date: "12 May 2025",
        time: "10:00 AM",
        amount: 1440,
        orders: 7
    },
    {
        id: 4,
        date: "12 May 2025",
        time: "10:00 AM",
        amount: 1440,
        orders: 7
    },
    {
        id: 5,
        date: "12 May 2025",
        time: "10:00 AM",
        amount: 1440,
        orders: 7
    },
]

export default function PastDeposite() {

    function renderDesposite({ item }) {
        return <View style={styles.detailsContainer}>
            <AntDesign name='checkcircle' color={COLORS.primary} size={20} />
            <View>
                <Text style={styles.headingDesposite}>UPI Payment</Text>
                <Text style={styles.timeDetails} >{item.date} {item.time}</Text>
            </View>
            <View>
                <View>
                    <Text>₹{item.amount}</Text>
                    <Text style={styles.timeDetails} >{item.order}orders</Text>
                </View >
            </View>
        </View>
    }

    return (
        <View style={styles.depositeContainer}>
            <View style={styles.pastDepositeWeekContainer}>
                <Text>Week</Text>
                <Text>12 May - 18 May</Text>
            </View>
            <FlatList data={data} renderItem={renderDesposite} keyExtractor={(item) => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    depositeContainer: {
        padding: 20,
        // paddingHorizontal:
    },
    pastDepositeWeekContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailsContainer: {
        backgroundColor: "white",
        padding: 12,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 12
    },
    headingDesposite: {
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center",

    },
    timeDetails: {
        color: COLORS.gray700,
        fontSize: 12
    }
})