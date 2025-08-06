import AntDesign from '@expo/vector-icons/build/AntDesign'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function footer() {
    return (

        <View style={styles.popular}>
            {/* <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 40, marginTop:30 }}>PROD - v 1.0.1(2)</Text> */}

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: 'gray' }}>A Delivery of Care <AntDesign name="heart" size={24} color="red" /> Sealed with Trust </Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: 'gray' }}>Made Love With mom Fam</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'gray' }}>Powered by </Text>
            <View style={{ flexDirection: 'row', padding: 20, marginLeft: 50 }}>
                <View style={{ flexDirection: 'column', flex: 1,alignItems:'center',justifyContent:'center',marginRight:"20%" }}>
                    <Image source={require('../assets/images/mom.png')} style={{ height: 90, width: 100 }} />
                    <Text>mom pharmacy</Text>
                </View>
                
            </View>



        </View>

    )
}

const styles = StyleSheet.create({
   
    popular: {

        marginTop: 50,
      marginBottom:50
    },
 
})