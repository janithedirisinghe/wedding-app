// src/services/authService.ts

export const register = async (username: string, email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Registration failed');
    }
  
    return res.json();
  };
  
  export const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }
  
    const data = await res.json();
    if (data.token) {
      // Store JWT token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      console.log(data);
    }
  
    return data;
  };
  
  export const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = () => {
    return typeof window !== 'undefined' && localStorage.getItem('token') !== null;
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  