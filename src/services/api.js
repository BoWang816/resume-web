import axios from 'axios'
import {
  personalInfo,
  aboutInfo,
  experiences,
  education,
  projects
} from './mockData'

// Create axios instance with base configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// 调试信息
console.log('API Base URL:', apiUrl)
console.log('Environment:', import.meta.env.MODE)

// 获取当前语言
const getCurrentLanguage = () => {
  return localStorage.getItem('i18nextLng') || 'zh'
}

const api = axios.create({
  baseURL: apiUrl,
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
    
    // Add language parameter for GET requests
    if (config.method === 'get') {
      const lang = getCurrentLanguage()
      config.params = {
        ...config.params,
        lang: lang
      }
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
    const { data } = response
    
    // 检查响应格式是否符合统一结构
    if (data && typeof data === 'object' && 'code' in data) {
      // 如果code不是200，抛出错误
      if (data.code !== 200) {
        throw new Error(data.message || 'API请求失败')
      }
      // 返回data字段的内容
      return data.data
    }
    
    // 如果不是统一格式，直接返回原始数据
    return data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Mock API functions (simulating real API calls)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 防重复调用缓存
const requestCache = new Map()
const pendingRequests = new Map()

// 防重复调用函数
const preventDuplicateRequest = (key, requestFn) => {
  // 如果请求正在进行中，返回相同的Promise
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)
  }

  // 如果有缓存，直接返回缓存结果
  if (requestCache.has(key)) {
    return Promise.resolve(requestCache.get(key))
  }

  // 创建新的请求
  const requestPromise = requestFn().then(result => {
    // 请求完成后，缓存结果
    requestCache.set(key, result)
    // 清除进行中的请求
    pendingRequests.delete(key)
    return result
  }).catch(error => {
    // 请求失败时，清除进行中的请求
    pendingRequests.delete(key)
    throw error
  })

  // 记录进行中的请求
  pendingRequests.set(key, requestPromise)
  return requestPromise
}

// 清除缓存函数
export const clearApiCache = (key) => {
  if (key) {
    requestCache.delete(key)
    pendingRequests.delete(key)
  } else {
    requestCache.clear()
    pendingRequests.clear()
  }
}

// 清除特定API的缓存
export const clearPersonalInfoCache = () => clearApiCache('personal-info')
export const clearAboutInfoCache = () => clearApiCache('about-info')
export const clearExperiencesCache = () => clearApiCache('experiences')
export const clearEducationCache = () => clearApiCache('education')
export const clearProjectsCache = () => clearApiCache('projects')
export const clearFeaturedProjectsCache = () => clearApiCache('featured-projects')

// 语言切换时清除所有缓存
export const clearAllCacheOnLanguageChange = () => {
  clearApiCache()
  console.log('All API cache cleared due to language change')
}

export const apiService = {
  // Get personal information
  getPersonalInfo: () => preventDuplicateRequest('personal-info', async () => {
    try {
      const response = await api.get('/personal-info')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(500) // Simulate network delay
      return personalInfo
    }
  }),

  // Get about information
  getAboutInfo: () => preventDuplicateRequest('about-info', async () => {
    try {
      const response = await api.get('/about-info')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(500)
      return aboutInfo
    }
  }),

  // Get work experiences
  getExperiences: () => preventDuplicateRequest('experiences', async () => {
    try {
      const response = await api.get('/experiences')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(700)
      return experiences
    }
  }),

  // Get education experiences
  getEducation: () => preventDuplicateRequest('education', async () => {
    try {
      const response = await api.get('/education')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(600)
      return education
    }
  }),

  // Get projects
  getProjects: () => preventDuplicateRequest('projects', async () => {
    try {
      const response = await api.get('/projects')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(600)
      return projects
    }
  }),

  // Get featured projects only
  getFeaturedProjects: () => preventDuplicateRequest('featured-projects', async () => {
    try {
      const response = await api.get('/projects/featured')
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(600)
      return projects.filter(project => project.featured)
    }
  }),



  // Send contact form
  sendContactForm: async (formData) => {
    try {
      const response = await api.post('/contact', formData)
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
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
    }
  },

  // Subscribe to newsletter (if needed)
  subscribeNewsletter: async (email) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email })
      return response
    } catch (error) {
      console.warn('API调用失败，使用mock数据:', error.message)
      await delay(800)
      console.log('Newsletter subscription:', email)
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      }
    }
  }
}

// Export individual API functions for easier imports
export const {
  getPersonalInfo,
  getAboutInfo,
  getExperiences,
  getEducation,
  getProjects,
  getFeaturedProjects,
  sendContactForm,
  subscribeNewsletter
} = apiService

export default api
