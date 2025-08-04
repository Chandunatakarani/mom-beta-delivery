import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Pickup() {
  const handleBackPress = () => {
    console.log('Back pressed');
  };

  return (
<ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpContainer}>
          <Image source={require('../../assets/images/447.png')} style={styles.helpIcon} />
          <Text style={styles.iconTitle}>Help</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Nearby store</Text>

      <View style={styles.pinContainer}>
        <Image source={require('../../assets/images/443.jpeg')} style={styles.pinIcon} />
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.imagesRow}>
          <Image source={require('../../assets/images/443.jpeg')} style={styles.routeImage} />
          <View style={styles.middleColumn}>
            <Text style={styles.reachTime}>Reach by 7:20 PM</Text>
            <View style={styles.dottedLine} />
          </View>
          <Image source={require('../../assets/images/444.png')} style={styles.routeImage} />
        </View>

        <View style={styles.labelsRow}>
          <Text style={styles.routeText}>1st cross</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.routeText}>Madhapur</Text>
        </View>
      </View>

      <View style={styles.combinedCard}>
        <View style={styles.pickupTitleRow}>
          <Image source={require('../../assets/images/445.png')} style={styles.orderIcon} />
          <Text style={styles.pickupTitle}>Pickup order</Text>
        </View>

        <Text style={styles.pharmacyName}>mom pharmacy</Text>

        <View style={styles.separator} />

        <Text style={styles.pharmacyAddress}>
          Ground Floor, Plot no 346{'\n'}
          S/7A, S/7B and 7C in survey No.11.7
        </Text>

        <TouchableOpacity style={styles.mapsButton}>
          <Image source={require('../../assets/images/448.png')} style={styles.mapsIcon} />
          <Text style={styles.mapsText}>Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push('./deliver')} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Reached pickup location</Text>
        </TouchableOpacity>
      </View>
    </View>
   </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    padding: 5,
  },

  backArrow: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  helpIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },

  iconTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },

  pinContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },

  pinIcon: {
    width: 300,
    height: 225,
    resizeMode: 'contain',
  },

  routeContainer: {
    marginBottom: 30,
  },

  imagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  middleColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  reachTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
    textAlign: 'center',
  },

  dottedLine: {
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    width: '100%',
    marginTop: 2,
  },

  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },

  routeText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    // width: 50,
  },

  combinedCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  pickupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  orderIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },

  pickupTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },

  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00A99D',
  },

  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
  },

  pharmacyAddress: {
    fontSize: 14,
    color: '#333',
    marginBottom: 25,
  },

  mapsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#00A99D',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  mapsIcon: {
    width: 20,
    height: 15,
    marginBottom: 2,
    resizeMode: 'contain',
  },

  mapsText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },

  bottomButton: {
    backgroundColor: '#00A99D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 0,
  },

  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

