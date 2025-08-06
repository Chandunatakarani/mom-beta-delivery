import userDeliveryAuth from '../context/authContext';
import apiClient from '../utils/apiClient';
import React, { useEffect, useState } from 'react'
// import { View, Text } from 'react-native'

function usePayoutWeekly({startingDate, endingDate}) {
    const [data, setData] = useState(null);
  const [weekPayouts, setWeekPayouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {extractToken} = userDeliveryAuth()

  useEffect(() => {
    if (!startingDate || !endingDate) return;

    const fetchWeekEarnings = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await extractToken(); // Optional: fetch from secure store or context
        const response = await apiClient(
          `earning/dateRangepayout/${startingDate},${endingDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if(response){
          setWeekPayouts(response.totalEarnings);
          setData(response.earnings);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekEarnings();
  }, [startingDate, endingDate]);

  return { weekPayouts, data, loading, error };
}



export default usePayoutWeekly