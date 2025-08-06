import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient"; // Axios instance
import userDeliveryAuth from "../context/authContext";
// Optional: get token from secure storage

function useWeekEarnings({ startingDate, endingDate }) {
  const [data, setData] = useState(null);
  const [weekEarnings, setWeekEarnings] = useState(null);
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
          `earning/dateRange/${startingDate},${endingDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if(response){
          setWeekEarnings(response.totalEarnings);
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

  return { weekEarnings, data, loading, error };
}

export default useWeekEarnings;
