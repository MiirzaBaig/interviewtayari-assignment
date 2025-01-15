const API_URL = 'http://localhost:8080/api';

export const interviewService = {
  // Get all interviews for the logged-in user
  async getAllByUser(token) {
    const response = await fetch(`${API_URL}/interviews`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token for authentication
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user-specific interviews');
    }
    return response.json();
  },

  // Get all public interviews (optional feature)
  async getPublic() {
    const response = await fetch(`${API_URL}/interviews/public`);
    if (!response.ok) {
      throw new Error('Failed to fetch public interviews');
    }
    return response.json();
  },

  // Create new interview
  async create(data, token) {
    const response = await fetch(`${API_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Send token for authentication
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create interview');
    }
    return response.json();
  },

  // Update interview
  async update(interviewId, data, token) {
    const response = await fetch(`${API_URL}/interviews/${interviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Send token for authentication
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update interview');
    }
    return response.json();
  },

  // Delete interview
  async delete(interviewId, token) {
    const response = await fetch(`${API_URL}/interviews/${interviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Send token for authentication
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete interview');
    }
    return response.json();
  },

  // Login
  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
    return response.json();
  },

  // Register
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return response.json();
  },
};
