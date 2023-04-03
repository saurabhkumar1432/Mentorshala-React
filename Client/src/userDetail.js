import axios from "axios";

async function fetchUserData() {
    const userEmail=localStorage.getItem('emailData')
    console.log(userEmail);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/mentorshala/getUserDetail/${userEmail}`);
      const data = response.data;
    //   console.log(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }
  export default async function() {
    const data = await fetchUserData();
    return data[0];
  };    
  