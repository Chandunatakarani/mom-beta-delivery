// import Help from '@/components/help/Help';
import { useOrders } from '../../context/orderContext';
import userDeliveryAuth from "../../context/authContext";
import { router } from 'expo-router';
import React, { useState } from 'react';
import apiClient from "../../utils/apiClient";
import { MaterialIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { useOnlineStatus } from '../../context/deliveryBoyStatusContext';
import * as Location from 'expo-location';


const App = () => {
  const [showCODModal, setShowCODModal] = useState(false);
  const [ShowUpiModel, setShowUpiModal] = useState(false);
  const [isCODConfirmed, setIsCODConfirmed] = useState(false);
  const [deliveryDetailsVisible, setDeliveryDetailsVisible] = useState(true);
  const [itemDetailsVisible, setItemDetailsVisible] = useState(true);
  const { extractToken } = userDeliveryAuth();
  const { acceptedOrderDetails,currentOrder, fetchCurrentOrder } = useOrders()
  const { setIsOnline} = useOnlineStatus()
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const customerLocation = {
      latitude: acceptedOrderDetails?.address_id.currentLocation?.latitude,
      longitude: acceptedOrderDetails?.address_id.currentLocation?.longitude,
    };

 
 async function addEarnings(){
  const token = await extractToken()
  try{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify({ orderId:currentOrder?._id, base_earning:20, bonus:0, deduction:0, ETA:12, total_earning:20 }),
    }
    const response = await apiClient("earning/create" ,options)
    
    if(response){
      return true
    }else{
      return false
    }
  }
  catch(err){
    console.log("Error in adding earnings" , err)
    return false
  }
 }

 
  console.log("orderid",currentOrder?._id)
  const handleDelivery = async () => {
    const token = await extractToken();
    console.log("token",token)
    try {
      const response = await apiClient(`api/delivered/${currentOrder?._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const deliveryEarnings = await addEarnings()
      setIsOnline(true)
      

      if (!response) {
        const errData = response;
        throw new Error(errData.message || 'Failed to update status');
      }
      if(deliveryEarnings){
        const data = response
      }else{
        console.log("Earning is not added" , "Please check you earnigs is not added")
      }
    } catch (error) {
      // console.error('error')
    }
    router.replace('/Tabs/Orders')
  };

  const handleCall = (phone) =>{
    let phoneNumber = `tel:${phone}`;
  Linking.openURL(phoneNumber);
  }

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
  
        const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords.latitude},${originCoords.longitude}&destination=${customerLocation.latitude},${customerLocation.longitude}&travelmode=driving`;
        Linking.openURL(url);
      } catch (error) {
        console.error('Error opening maps:', error);
        console.log('Error', 'Unable to open maps.');
      }
    };
  
    const fetchDistance = async (originCoords) => {
      try {
        if (!originCoords || !originCoords.latitude || !originCoords.longitude) {
          console.error('Invalid origin coordinates:', originCoords);
          console.log('Error', 'Invalid origin coordinates.');
          return;
        }
  
        const apiKey = ''; 
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${customerLocation.latitude},${customerLocation.longitude}&key=${apiKey}`;
  
        const response = await fetch(url);
        const res = await response.json();
  
        if (res.status !== 'OK' || !res.routes?.length || !res.routes[0].legs?.length) {
          console.error('No routes found', res);
          console.log('Error', res.error_message || 'No valid routes found. Check your API key or coordinates.');
          return;
        }
  
        const distanceText = res.routes[0].legs[0].distance.text;
        setDistance(distanceText);
        console.log('Distance:', distanceText);
      } catch (error) {
        console.error('Error fetching distance:', error);
        console.log('Error', 'Could not calculate distance.');
      }
    };
  
  return (
    <View style= {{flex:1 , backgroundColor: "#fff"}}>
    <ScrollView style={styles.container}>
      <View style={styles.screen}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/prof1.jpeg')}
            style={styles.profileImage}
          />
          <View>            <Text style={styles.label}>Deliver to</Text>
            <Text style={styles.name}>{acceptedOrderDetails?.user_id.name}</Text>
            <Text style={styles.contact}>{acceptedOrderDetails?.user_id.mobileNo}</Text>
          </View>
        </View>

        {/* Delivery Details */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setDeliveryDetailsVisible(!deliveryDetailsVisible)}
          >
            <Text style={styles.label}>Delivery Details</Text>
            <Text style={styles.arrow}>{deliveryDetailsVisible ?  <MaterialIcons name='keyboard-arrow-up' size={24} /> : <MaterialIcons name='keyboard-arrow-down' size={24} />}</Text>
          </TouchableOpacity>
          {deliveryDetailsVisible && (
            <>
              <Text style={styles.address}>

                {acceptedOrderDetails?.address_id.street},
                {acceptedOrderDetails?.address_id.city},
                {acceptedOrderDetails?.address_id.state},
                {acceptedOrderDetails?.address_id.pincode}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.mapButton} onPress={handleMaps}>
                  <Text style={styles.buttonText}>Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={()=>{handleCall(acceptedOrderDetails?.user_id.mobileNo)}}>
                  <Text style={styles.buttonText}>Call Customer</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.label}>Payment Pending</Text>
          <View style={styles.paymentButtons}>
            <TouchableOpacity
              style={styles.codButton}
              onPress={() => setShowCODModal(true)}
            >
              <Text style={styles.buttonText}>COD</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.upiButton}
              onPress={() => setShowUpiModal(true)}
            >
              <Text style={styles.buttonText}>UPI</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Item Details */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setItemDetailsVisible(!itemDetailsVisible)}
          >
            <Text style={styles.label}>Item Details</Text>
            <Text style={styles.arrow}>{itemDetailsVisible ? <MaterialIcons name='keyboard-arrow-up' size={24} /> : <MaterialIcons name='keyboard-arrow-down' size={24} />}</Text>
          </TouchableOpacity>
          {itemDetailsVisible && (
            <FlatList
            scrollEnabled={false}
              data={acceptedOrderDetails?.medicines}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={styles.item}>
                  {item.name} x {item.quantity}
                </Text>
              )}
              
            />
          )}
        </View>

        {/* Delivery Complete */}
        <TouchableOpacity
        style={[
          styles.completeButton,
          { backgroundColor: isCODConfirmed ? '#00A99D' : '#ccc' } // Green if confirmed, grey if not
        ]}
        onPress={isCODConfirmed ? handleDelivery : null}
        disabled={!isCODConfirmed}
        >
        <Text style={styles.completeText}>Delivery Complete</Text>
        </TouchableOpacity>


        {/* COD Confirmation Modal */}
        <Modal visible={showCODModal} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Collected Cash From Customer?</Text>
              <View style={styles.modalButtonRow}>
                <Pressable
                  style={styles.modalYesButton}
                  onPress={() => {
                    setIsCODConfirmed(true);
                    setShowCODModal(false)
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </Pressable>
                <Pressable
                  style={styles.modalNoButton}
                  onPress={() => setShowCODModal(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={ShowUpiModel} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Coming soon!!</Text>
              <View style={styles.modalButtonRow}>
                {/* <Pressable
                  style={styles.modalYesButton}
                  onPress={() => setShowCODModal(false)}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </Pressable> */}
                <Pressable
                  style={styles.modalNoButton}
                  onPress={() => setShowUpiModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  profileImage: {
    width: 20,
    height: 30,
    borderRadius: 30,
    marginBottom: 55,

  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#00a99d',


  },
  contact: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,

  },
  card: {
    backgroundColor: '#D5ECE9',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  mapButton: {
    backgroundColor: '#00a99d',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#00a99d',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  paymentButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  codButton: {
    backgroundColor: '#00a99d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  upiButton: {
    backgroundColor: '#00a99d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    paddingVertical: 6,
    color: '#333',
  },
  completeButton: {
    marginTop: 30,
    backgroundColor: '#008080',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  modalYesButton: {
    backgroundColor: '#00a99d',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalNoButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;