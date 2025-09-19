import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 导入语言文件
import zh from './locales/zh.json'
import en from './locales/en.json'

const resources = {
  zh: {
    translation: zh
  },
  en: {
    translation: en
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh', // 默认语言设置为中文
    lng: 'zh', // 初始语言设置为中文
    debug: false,

    interpolation: {
      escapeValue: false, // React 已经默认转义了
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  })

export default i18n
