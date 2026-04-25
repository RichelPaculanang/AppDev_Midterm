const BASE_URL = 'http://localhost:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Define types for the API functions
interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function authLogin({ username, password }: LoginCredentials): Promise<AuthResponse> {
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log('Login Error:', errorMessage);
    throw error;
  }
}

export async function authRegister({ username, password }: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(BASE_URL + '/register', {
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
      throw new Error(data.message || 'Registration failed');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log('Registration Error:', errorMessage);
    throw error;
  }
}
