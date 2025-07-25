import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials)
      const { token, user } = response.data

      // Store token in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      return { token, user }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  // Get current user from token
  getCurrentUser: () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return null

      // For mock implementation, decode the base64 token
      const decoded = JSON.parse(atob(token))

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        authService.logout()
        return null
      }

      return decoded
    } catch (error) {
      authService.logout()
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authService.getCurrentUser() !== null
  },

  // Get user role
  getUserRole: () => {
    const user = authService.getCurrentUser()
    return user?.role || null
  },
}

// Mock API responses for demo
export const mockAuthService = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock users for demo
    const mockUsers = {
      "admin@mwangaza.com": { role: "admin", name: "Admin User", password: "admin123" },
      "learner@mwangaza.com": { role: "learner", name: "John Learner", password: "learner123" },
      "counselor@mwangaza.com": { role: "counselor", name: "Dr. Sarah Wilson", password: "counselor123" },
    }

    const user = mockUsers[credentials.email]

    if (!user || user.password !== credentials.password) {
      throw new Error("Invalid email or password")
    }

    // Create mock JWT token
    const token = btoa(
      JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        role: user.role,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      }),
    )

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify({ email: credentials.email, role: user.role, name: user.name }))

    return { token, user: { email: credentials.email, role: user.role, name: user.name } }
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful registration
    return { message: "Registration successful! Please login." }
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser: () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return null

      const decoded = JSON.parse(atob(token))

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        mockAuthService.logout()
        return null
      }

      return decoded
    } catch (error) {
      mockAuthService.logout()
      return null
    }
  },

  isAuthenticated: () => {
    return mockAuthService.getCurrentUser() !== null
  },

  getUserRole: () => {
    const user = mockAuthService.getCurrentUser()
    return user?.role || null
  },
}
