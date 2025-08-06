import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import apiClient from "../utils/apiClient";
// import { log } from "console";
// import { json } from "stream/consumers";


export const DeliveryBoyAuthContext = createContext(null);

export const DeliveryBoyAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status,setStatus]=useState("Loading");
  const [token, setToken] = useState(null);
  const [deliveryBoyDetails, setDeliveryBoyDetails] = useState(null);
  
  const getDeliveryBoyDetails = useCallback(async (authToken) => {
    console.log("this is from context " , deliveryBoyDetails)
    try {
      if (!authToken) return;
      setLoading(true);
      console.log("this is from get details"  , authToken)
      const response = await apiClient(`delivery/deliveryboy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response) {
        setDeliveryBoyDetails(response);       
        setIsLoggedIn(true)
        setStatus("Success")
      } else {
        router.replace('/Login/login')
        console.error('Failed to fetch delivery boy details:', response);
        setStatus("Error")
      }
    } catch (error) {
      console.error('Error fetching delivery boy details:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkDeliveryBoy = async () => {
      try {
        // await AsyncStorage.removeItem("deliveryBoy")
        const storedToken = await AsyncStorage.getItem('deliveryBoy');
        console.log("stored token ",storedToken);     
        console.log("this is context" , deliveryBoyDetails)
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken);
          console.log("stored token" , parsedToken)
          setToken(parsedToken);
          getDeliveryBoyDetails(parsedToken);
          setIsLoggedIn(() => true);
        }
      } catch (error) {
        console.error('Error checking delivery boy:', error);
      } finally {
        setLoading(false);
      }
    };
    checkDeliveryBoy();
  }, [getDeliveryBoyDetails]);


  console.log("this is from auth delivery boy details" , deliveryBoyDetails)

  const loginWithOtp = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await apiClient('delivery/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: phoneNumber }),
        
      });
               
      if (response) {
        const data = response;
        router.replace({ pathname: '/Login/otp', params: { deliveryBoy: phoneNumber } });
        console.log('Login initiated:', data);
      } else {
        Alert.alert('Login failed!', 'Unable to login. Please try again.');
      }
    } catch (error) {
      console.error('Error during delivery boy login:', error);
      Alert.alert('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  
  
 const resendOtp= async(phoneNumber)=>{
   console.log("number for resend otp" , phoneNumber)
    try{
       setLoading(true)

       const response = await apiClient('delivery/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: phoneNumber }),
        
      });


       
       if(response){
        // const data1= response
        console.log("resend otp started",response);       
       }
       else{
        Alert.alert('11111111111111111111111111111')
       }
    }
    catch(e){
         console.log("2222222222222222222222222",e);
         Alert.alert('2222222222222222222222222')       
    }
    finally{
      setLoading(false)
    }

 }
  const verifyOtp = async (otp, phoneNumber) => {
    try {
      setLoading(true);
      const response = await apiClient('delivery/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, mobileNumber: phoneNumber }),
      });

      if (response) {
        const data = response
        await AsyncStorage.setItem('deliveryBoy', JSON.stringify(data.token));
        setToken(data.token);
        setIsLoggedIn(true);
        getDeliveryBoyDetails(data.token);
        return true;
      } else {
        Alert.alert('Invalid OTP', 'Please try again.');
        return false;
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('An error occurred during OTP verification.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('deliveryBoy');
      setToken(null);
      setIsLoggedIn(false);
      console.log('yyyyyyyyyyyyyyyyyyyy',deliveryBoyDetails,"these are the delivery boy details");
      setDeliveryBoyDetails(null);
      console.log('ttttttttttttttt',deliveryBoyDetails,"these are the delivery boy details");
      router.replace('/Login/login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout failed. Try again.');
    }
  };

  async function extractToken() {
    const token = await AsyncStorage.getItem("deliveryBoy")
    const parsedToken = JSON.parse(token)
    return parsedToken
  }
 async function DeleteDeliveryBoy(number,authToken){
        try{
             const option={
              method:'DELETE',
              headers:{
                "Authorization":`Bearer ${authToken}`,
                "Content-Type":"application/json"

              },
              body:JSON.stringify({number,authToken})
             }
             const response= await apiClient('delivery/delete',option)
             if(response){
              console.log("delivery boy deleted successfully!!!!!!!!!!!!",response,"form delete auth"); 
              setDeliveryBoyDetails(()=>null)
              // setDeliveryBoyDetails(' ') 
              console.log("deliver boy is registered",deliveryBoyDetails.isRegistered);
              console.log("this is the deliver boy details after deleting the account",deliveryBoyDetails);               
              router.replace('/Login/login')       
             }
             else return false
        }
        catch(e){
             console.log("unable to delete the user and this message is from the catch block",e);            
        }
    }

  async function registerUser(authToken , data){
    try{
      const options = {
        method:"POST" ,
        headers:{
          "Authorization":`Bearer ${authToken}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
      }
      const reponse = await apiClient("delivery/register" , options)

      
      if(reponse) {
        await getDeliveryBoyDetails(authToken)
        return true
       }
      else return false 
    }catch(err){
      console.log("error in registering the delivery boy" , err)
      return false
    }
  }

  return (
    <DeliveryBoyAuthContext.Provider
      value={{
        loginWithOtp,
        resendOtp,
        verifyOtp,
        logout,
        isLoggedIn,
        loading,
        deliveryBoyDetails,
        getDeliveryBoyDetails,
        extractToken , 
        registerUser,
        DeleteDeliveryBoy,
        token
      }}
    >
      {children}
    </DeliveryBoyAuthContext.Provider>
  );
};


export default function userDeliveryAuth() {
  const context = useContext(DeliveryBoyAuthContext)
  if (!context) throw new Error("Context not defined")
  return context
}
