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
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      
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

  const loadUserProfileData = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
      if (data.success) {
        setUserData(data.userData)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
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
