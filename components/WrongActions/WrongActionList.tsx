import { COLORS } from "../../constants/COLORS"
import { screenWidht } from "../../constants/ScreenConfig"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

const wrongActionListItems = [
    {
        id:1 ,
        content:"Always wear your t-shirt while making a delivery "
    },
    {
        id:2,
        content:"Make sure to always deliver the package to the customer"
    },
    {
        id:3,
        content:"Make sure to not cancel the order after accepting "
    }
]

function WrongActionsList(){

    function renderWrongActionITem({item}){
        return <View style={styles.wrongActionItem}>
            <AntDesign name="checkcircle" size={24} color={COLORS.primary}/>
            <Text style={styles.wrongItemContent}>{item.content}</Text>
        </View>
    }

    return <View style={styles.wrongActionListContainer}>
        <Text style={styles.wrongActionListHeading}>Ways to avoid wrong actions</Text>
        <FlatList data={wrongActionListItems} keyExtractor={(item)=>item.id} renderItem={renderWrongActionITem} />
    </View>
}

export default WrongActionsList

const styles = StyleSheet.create({
    wrongActionListContainer:{
        flex:1 , 
        backgroundColor:"white",
        alignItems:"center",
        padding:30,
        marginTop:1
    },
    wrongActionListHeading:{
        fontWeight:"bold",
        fontSize:20,
        fontFamily:"dm sans",
        marginBottom:20
    },
    wrongActionItem:{
        flexDirection:"row",
        gap:12,
        padding:8,
        marginTop:12
    },
    wrongItemContent:{
        width:screenWidht/1.3
    }
})