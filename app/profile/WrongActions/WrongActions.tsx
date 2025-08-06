import { COLORS } from "../../../constants/COLORS"
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { screenWidht } from '../../../constants/ScreenConfig'
import WrongActionsList from "../../../components/WrongActions/WrongActionList"
import { useNavigation } from "@react-navigation/native"
import { router } from "expo-router"

function WrongActions() {

    const navigation = useNavigation()

    return <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.actionContainer}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" style={styles.MaterialIcons} onPress={()=>router.back()} />
        <Text style={styles.headerTitle1}>Wrong Actions</Text>
            <View style={styles.actionDetailsContainer}>
                <View style={styles.laughContainer}>
                    <AntDesign name="smileo" color={COLORS.primary} size={24} />
                </View>
                <Text style={styles.actionCount}>0</Text>
                <Text>Wrong actions in the last 30 days</Text>
            </View>
            <TouchableOpacity style={styles.actionDetailsNav} onPress={() => navigation.navigate('WrongActionDetails')}>
                <Text style={styles.actionDetailsNavContent}>See wrong action history</Text>
                <AntDesign name="right" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
        </View>
        <WrongActionsList />
    </SafeAreaView>
}

export default WrongActions

const styles = StyleSheet.create({
    actionContainer: {
        justifyContent:"center",
        alignItems: "center",
        backgroundColor:'#fff',   
    },
     MaterialIcons: {
    marginLeft: -350,
    marginTop: 10,
     color: '#00a99d',

  },

  headerTitle1: {
    color: '#00a99d',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -25,
    marginLeft:-150,
    marginBottom:20,
  },
    actionDetailsContainer: {
        backgroundColor: "#D5ECE9",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        gap: 6,
        borderRadius: 12,
        elevation: 2,
        width:screenWidht/1.18,
        borderWidth:1,
        borderColor:'#00a99d',
    },
    actionCount: {
        fontSize: 25,
        fontWeight: "bold"
    },
    laughContainer: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 35,
        borderWidth:1,
        borderColor:'#00a99d',
    },
    actionDetailsNav: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        padding: 20,
        paddingHorizontal:50,
        marginTop: 30,
        width:screenWidht/1.18
    },
    actionDetailsNavContent: {
        color: '#00a99d',
        fontWeight: "bold"
    },

})