import axios from 'axios'
import {
  personalInfo,
  aboutInfo,
  experiences,
  projects,
  socialLinks,
  contactInfo
} from './mockData'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Mock API functions (simulating real API calls)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const apiService = {
  // Get personal information
  getPersonalInfo: async () => {
    await delay(500) // Simulate network delay
    return personalInfo
  },

  // Get about information
  getAboutInfo: async () => {
    await delay(500)
    return aboutInfo
  },

  // Get work experiences
  getExperiences: async () => {
    await delay(700)
    return experiences
  },

  // Get projects
  getProjects: async () => {
    await delay(600)
    return projects
  },

  // Get featured projects only
  getFeaturedProjects: async () => {
    await delay(600)
    return projects.filter(project => project.featured)
  },

  // Get social links
  getSocialLinks: async () => {
    await delay(300)
    return socialLinks
  },

  // Get contact information
  getContactInfo: async () => {
    await delay(400)
    return contactInfo
  },

  // Send contact form
  sendContactForm: async (formData) => {
    await delay(1000)
    console.log('Contact form submitted:', formData)
    
    // Simulate success/error responses
    if (Math.random() > 0.1) { // 90% success rate
      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      }
    } else {
      throw new Error('Failed to send message. Please try again.')
    }
  },

  // Subscribe to newsletter (if needed)
  subscribeNewsletter: async (email) => {
    await delay(800)
    console.log('Newsletter subscription:', email)
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    }
  }
}

// Export individual API functions for easier imports
export const {
  getPersonalInfo,
  getAboutInfo,
  getExperiences,
  getProjects,
  getFeaturedProjects,
  getSocialLinks,
  getContactInfo,
  sendContactForm,
  subscribeNewsletter
} = apiService

export default api
