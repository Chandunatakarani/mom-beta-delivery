import { router } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import userDeliveryAuth from '../../context/authContext';
import apiClient from '../../utils/apiClient';
import { useOrders } from '../../context/orderContext';

export default function Pickup() {
  const PickUpLocation = {
    latitude: 17.4572416,
    longitude: 78.3806970,
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const { currentOrder, fetchCurrentOrder } = useOrders();
  const { extractToken } = userDeliveryAuth();
  useFocusEffect(
    useCallback(() => {
      fetchCurrentOrder();
    }, [])
  );

  const handlePickup = async () => {
    if (!currentOrder?._id) return Alert.alert('Error', 'No active order found.');
    console.log("orderpick",currentOrder?._id)
    const token = await extractToken();

    try {
      const result = await apiClient(`api/setPickup/${currentOrder?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (result) {
        console.log('Pickup set successfully:', result);
        await fetchCurrentOrder();
        
        router.replace('/delivery/deliver');
      } else {
        console.log('Error', 'Failed to confirm pickup.');
      }
    } catch (err) {
      console.error('Error during pickup:', err);
      
    }
  };

  const handleMaps = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission Denied', 'Location permission is required to open maps.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const originCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(originCoords);

      await fetchDistance(originCoords);

      const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords.latitude},${originCoords.longitude}&destination=${PickUpLocation.latitude},${PickUpLocation.longitude}&travelmode=driving`;
      Linking.openURL(url);
    } catch (error) {
      console.error('Error opening maps:', error);
      console.log('Error', 'Unable to open maps.');
    }
  };

  const fetchDistance = async (originCoords) => {
    try {
      if (!originCoords?.latitude || !originCoords?.longitude) {
        console.log('Error', 'Invalid origin coordinates.');
        return;
      }

      const apiKey = ''; 
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${PickUpLocation.latitude},${PickUpLocation.longitude}&key=${apiKey}`;

      const response = await fetch(url);
      const res = await response.json();

      if (res.status !== 'OK' || !res.routes?.length || !res.routes[0].legs?.length) {
        console.log('Error', res.error_message || 'No valid routes found.');
        return;
      }

      const distanceText = res.routes[0].legs[0].distance.text;
      setDistance(distanceText);
      console.log('Distance:', distanceText);
    } catch (error) {
      console.error('Error fetching distance:', error);
      Alert.alert('Error', 'Could not calculate distance.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pickup Store Location</Text>
      <Text style={styles.tag}>#Deliver on time, Earn more coupons!</Text>

      <View style={styles.pinContainer}>
        <Image source={require('../../assets/images/deliverymap1.jpeg')} style={styles.pinIcon} />
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.imagesRow}>
          <Image source={require('../../assets/images/scooty.jpeg')} style={styles.routeImage} />
          <View style={styles.middleColumn}>
            <Text style={styles.reachTime}>On the way to store</Text>
            <View style={styles.dottedLine} />
          </View>
          <Image source={require('../../assets/images/444.png')} style={styles.routeImage} />
        </View>

        <View style={styles.labelsRow}>
          <Text style={styles.routeText}>Heal Porter</Text>
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

        <TouchableOpacity style={styles.mapsButton} onPress={handleMaps}>
          <Image source={require('../../assets/images/Orders/location1.png')} style={styles.mapsIcon} />
          <Text style={styles.mapsText}>Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
    await handlePickup();      
    router.push('./deliver');  
  }} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Reached pickup location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
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
    color:'#00A99D',
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
  tag: {
    textAlign: 'center',
    color: "grey",
    bottom: 10,
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
    color: '#00A99D',
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
    backgroundColor: '#D5ECE9',
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
    height: 20,
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
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 0,
  },

  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});