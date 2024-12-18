import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  
  // Fetch the backend URL from environment variable or fallback to a default
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Default for development
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData, setUserData] = useState(false)
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  

  // Function to fetch doctors data
  const getDoctorsData = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        headers: { token },
      });
      
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        setError(data.message || "Failed to fetch doctors.");
        toast.error(data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      setError(error.message || "An unexpected error occurred.");
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  const loadUserProfileData = async () => {
    console.log("Loading user profile data...");
    console.log("Token in use:", token);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token }, // Updated header
      });
  
      if (data.success) {
        console.log("User profile data retrieved successfully:", data.userData);
        setUserData(data.userData);
      } else {
        console.error("Failed to retrieve user profile data:", data.message);
        toast.error(data.message || "Failed to load user profile data.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Token is invalid or expired:", error.response.data);
          toast.error("Session expired. Please log in again.");
          setToken(false); // Clear invalid token
          localStorage.removeItem("token"); // Clear from localStorage
        } else {
          console.error("Server responded with an error:", error.response.data);
          toast.error(error.response.data.message || "Server error occurred.");
        }
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      console.log("Finished loading user profile data.");
    }
  };
  
  // The context value that will be shared across components
  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    loading,
    error,
    token, setToken, backendUrl,
    userData, setUserData,
    loadUserProfileData,
  };

  // Call getDoctorsData once when the component mounts
  useEffect(() => {
    getDoctorsData();
  }, []); // Empty dependency array ensures it runs once after initial render

useEffect(()=>{
if(token){
  loadUserProfileData()
}
else{
  setUserData(false)
}
},[token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
