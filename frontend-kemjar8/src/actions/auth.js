import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
        username,
        password,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Login failed. Please try again.');
  }
}
