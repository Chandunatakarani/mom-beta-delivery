import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { router, useRouter } from 'expo-router';
import userDeliveryAuth from '../../context/authContext';
import apiClient from '../../utils/apiClient';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [registerLoading , setRegisterLoading] = useState(false)
  const router = useRouter();

  const {extractToken} = userDeliveryAuth()

  async function signupUser() {
    const AuthToken = await extractToken();

    try {
      const options = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AuthToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          vehicleType,
          aadhaar,
          pan,
          drivingLicense
        })
      }
      setRegisterLoading(true)
    const response = await apiClient("delivery/register", options);
    setRegisterLoading(false)
      if (response) {
        await getdeliveryBoyDetails(AuthToken)
        console.log(response);
        router.replace('/')
      } else {
        router.replace("/Login/login");
      }
    } catch (e) {
      console.log("Error in signing up", e)
    }
  }

  const validateAadhaar = (number) => {
    const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;
    return aadhaarRegex.test(number);
  };

  const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.trim().toUpperCase());
};



const [errors , setErrors ] = useState ({})
  const handleSignUp = () => {
    const newErrors={};
    if (!name.trim()) return Alert.alert("invalid", 'Name is required');
    if (!vehicleType.trim()){
      newErrors.vehicleType = 'Vehicle type is required';}
    if (!aadhaar.trim()){ 
      newErrors.aadhaar= 'Aadhaar number is required';}
      else if (!validateAadhaar(aadhaar.trim())){
        newErrors.aadhaar =  "please enter a valid aadhar number"
      }
    if (!pan.trim()) {
      newErrors.pan =  'PAN card number is required';}
      else if (!validatePAN(pan.trim())){
        newErrors.pan =  "please enter a valid pan number"
      }
    if (!drivingLicense.trim()){
      newErrors.drivingLicense  =  'Driving license is required'; }

      setErrors(newErrors);

      if( Object.keys(newErrors).length ===0){
        signupUser();
        router.push('/Tabs/home');
      }
 
  };
 


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.header}>Sign Up</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Vehicle Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter vehicle type"
                value={vehicleType}
                onChangeText={setVehicleType}
              />
              {errors.vehicleType && <Text style={styles.errorText}>{errors.vehicleType}</Text>}

ss
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Aadhaar Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Aadhar number - eg: 5768 3456 4758"
                value={aadhaar}
                onChangeText={setAadhaar}
                keyboardType="numeric"
                maxLength={12}
              />
                 {errors.aadhaar && <Text style={styles.errorText}>{errors.aadhaar}</Text>}
           
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>PAN Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter PAN card number - eg:AAAPA1234A"
                value={pan}
                onChangeText={setPan}
                maxLength={10}
              />
              {errors.pan && <Text style={styles.errorText}>{errors.pan}</Text>}

            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Driving License</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter driving license number"
                value={drivingLicense}
                onChangeText={setDrivingLicense}
              />
              {errors.drivingLicense && <Text style={styles.errorText}>{errors.drivingLicense}</Text>}
            </View>

            <Button
              mode="contained"
              style={styles.signUpButton}
              contentStyle={styles.signUpButtonContent}
              onPress={handleSignUp}
              disabled={registerLoading}
            >
              {registerLoading?<ActivityIndicator />:<Text style={styles.signUpText}>Sign Up</Text>}
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  errorText:{
    color:"red",
    paddingHorizontal: 16,
    marginTop:10,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#007E71',
    marginBottom: 30,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    paddingLeft: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#E8F1F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  signUpButton: {
    marginTop: 30,
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#007E71',
  },
  signUpButtonContent: {
    height: 50,
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



 

function getdeliveryBoyDetails(AuthToken: any) {
  throw new Error('Function not implemented.');
}

function ExtractParseToken() {
  throw new Error('Function not implemented.');
}