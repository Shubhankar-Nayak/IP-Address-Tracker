import axios from 'axios';

const API_URL = 'https://geo.ipify.org/api/v2/country,city';
const API_KEY = 'at_m6KkgQ8IzxgaBiSyxouKMsLFob72U'; // Replace with your actual API key

export const fetchIpData = async (ipAddress) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        ipAddress: ipAddress, // Use the correct query parameter name
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw error;
  }
};
