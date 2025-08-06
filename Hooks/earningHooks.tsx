// src/utils/dateUtils.js

import apiClient from "../utils/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

async function getToken(){
  const token = await AsyncStorage.getItem("deliveryBoy")
  return token
}

export function convertDayToName(day) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[day];
}

export function covertMonthsToNames(month){
    const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
return months[month]
}

export function last8Weeks(){
    const weeks = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find Monday of this week
        const day = today.getDay();
        const diffToMonday = day === 0 ? -6 : 1 - day;
        const thisMonday = new Date(today);
        thisMonday.setDate(today.getDate() + diffToMonday);

        // Loop 8 times for 8 weeks
        for (let i = 0; i < 8; i++) {
            const startOfWeek = new Date(thisMonday);
            startOfWeek.setDate(thisMonday.getDate() - i * 7);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            weeks.push({
                id:i+1 , 
                label:`Last Week ${i+1}`,
                start: new Date(startOfWeek).toISOString().split("T")[0],
                end: new Date(endOfWeek).toISOString().split("T")[0],
            });
        }

        return weeks;
}

export function useEarnings(){
  const [earnings, setEarnings] = useState([]);

  useEffect(()=>{
    async function fetchEarnings(){
      const token = await AsyncStorage.getItem("deliveryBoy")
      const paredToken = JSON.parse(token)
      console.log("this is from hook" , token)
      try{
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${paredToken}`
          }
        }
        const response =  await apiClient("earning/getEarnings" , options)
        console.log(response)
        if(response){
          setEarnings(response)
        }
      }catch(e){
        console.log("Error in fetching earning in hook" , e)
      }
    }
    fetchEarnings()
  } , [])

  return {getEarnings:earnings.earning}
}

