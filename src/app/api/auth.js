const BASE_URL = 'http://localhost:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ username, password }) {
  try {
    console.log('Attempting login to:', BASE_URL + '/login');
    const response = await fetch(BASE_URL + '/login', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || data.message || 'Login failed');
    }
  } catch (error) {
    console.log('Login Error:', error.message);
    throw error;
  }
}

export async function authRegister({ password, username }) {
  try {
    const response = await fetch(BASE_URL + '/register', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        password,
        username,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Registration failed');
    }
  } catch (error) {
    console.log('Registration Error:', error.message);
    throw error;
  }
}