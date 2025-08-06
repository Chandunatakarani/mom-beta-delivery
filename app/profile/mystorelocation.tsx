import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import apiClient from '../../utils/apiClient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const wp = (percentage: string) => (width * parseFloat(percentage)) / 100;
const hp = (percentage: string) => (height * parseFloat(percentage)) / 100;

import { useNavigation } from '@react-navigation/native';

export default function AddressBook() {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isPrimaryModalVisible, setIsPrimaryModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    lat1 = parseFloat(String(lat1));
    lon1 = parseFloat(String(lon1));
    lat2 = parseFloat(String(lat2));
    lon2 = parseFloat(String(lon2));

    if ([lat1, lon1, lat2, lon2].some((v) => isNaN(v))) return 'N/A';

    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const fetchAddresses = async () => {
    try {
      const response = await apiClient('storeAddress/allStoreAddress');
      const storeData = response.StoreAddress1;

      if (Array.isArray(storeData)) {
        await fetchLocationAndDistance(storeData);
      } else {
        setAddresses([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching store addresses:', error);
      setLoading(false);
    }
  };

  const fetchLocationAndDistance = async (stores: any[]) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission denied');
      setAddresses(stores.map((s) => ({ ...s, distance: 'N/A' })));
      setLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const userLat = location.coords.latitude;
    const userLon = location.coords.longitude;

    const withDistance = stores.map((store) => {
      console.log('Store:', store); 

      const lat = parseFloat(String(store.CurrentLocation.latitude));
      const lon = parseFloat(String(store.CurrentLocation.longitude));

      const dist = getDistanceFromLatLonInKm(userLat, userLon, lat, lon);
      return { ...store, distance: isNaN(parseFloat(dist)) ? 'N/A' : `${dist} km` };
    });

    setAddresses(withDistance);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleNavigate = (store: any) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${store.latitude},${store.longitude}`,
      android: `google.navigation:q=${store.latitude},${store.longitude}`,
    });

    Linking.openURL(url);
  };

  const handleSetPrimary = () => {
    setIsPrimaryModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#00A99D" style={{ marginVertical: 20 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Store Location</Text>
        </View>
        <View style={styles.head}>
          <Text style={styles.subHeader}>Store Addresses</Text>
        </View>

        {addresses.map((item, index) => (
          <View key={item._id || index} style={styles.card}>
            <View style={styles.radioRow}>
              <FontAwesome name="home" size={24} color="#007E71" />
              <Text style={styles.cardTitle}>Address {index + 1}</Text>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color="#444"
                style={{ marginLeft: 'auto' }}
                onPress={() => {
                  setSelectedAddress(item);
                  setIsPrimaryModalVisible(true);
                }}
              />
            </View>
            <Text style={styles.cardText}>
              {item.Building}, {item.City}, {item.DoorNo}, {item.Street}, {item.Pincode}
            </Text>
            <Text style={styles.distanceText}>Distance: {item.distance || 'N/A'}</Text>

            <TouchableOpacity onPress={() => handleNavigate(item)}>
              <Text style={styles.navigationText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Modal
          visible={isPrimaryModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsPrimaryModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Set as primary address</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleSetPrimary}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsPrimaryModalVisible(false)}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef7f6',
    padding: 8,
    // marginHorizontal: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 25,
    marginVertical: 20,
  
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
    // marginTop: 20,
    color: '#00A99D',
  },
  head: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
    // backgroundColor:'#ACD9D4',
    borderRadius: 15,
    borderColor: '#00A99D',
    borderWidth: 0.5,
    marginHorizontal: 4,
    
  },
  subHeader:{
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,

  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F8FAFA',
    // borderColor: '#00A99D',

    // shadowColor: '#00A99D',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.18,
    // shadowRadius: 8,
    // // Android shadow
    // elevation: 4,
    elevation: 3,
    // marginHorizontal: 12,
    shadowColor: '#00a99d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#e0f2f1',

    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1, // Keep only one borderWidth
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
    // backgroundColor: "#E8F1F0",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  distanceText: {
    fontSize: 16,
    color:'#FF0000',
    marginTop: 5,
  },
  // navigationContainer:{
  //   backgroundColor: 'white',
  // },
  navigationText: {
    fontSize: 14,
    color: '#00a99d',
    marginTop: 5,
    textDecorationLine: 'underline',
   
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('5%'),
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '90%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00796b',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
  },
});