import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import { clearAllCacheOnLanguageChange } from '../services/api'

const languages = [
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }
]

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
    // 清除API缓存，确保获取新语言的数据
    clearAllCacheOnLanguageChange()
    handleClose()
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <Box>
      <Tooltip title={t('language.switch')} arrow>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={handleClick}
            sx={{
              color: 'text.primary',
              backgroundColor: 'rgba(0, 212, 170, 0.1)',
              border: '1px solid rgba(0, 212, 170, 0.3)',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 212, 170, 0.2)',
                borderColor: 'rgba(0, 212, 170, 0.5)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 212, 170, 0.3)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '1.1rem',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{currentLanguage.flag}</span>
              <LanguageIcon sx={{ fontSize: '1rem' }} />
            </Box>
          </IconButton>
        </motion.div>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(26, 31, 58, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 170, 0.2)',
            borderRadius: '12px',
            mt: 1,
            minWidth: '160px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <AnimatePresence>
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuItem
                onClick={() => handleLanguageChange(language.code)}
                selected={i18n.language === language.code}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    transform: 'translateX(4px)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 212, 170, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 170, 0.2)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px' }}>
                  <Box
                    sx={{
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {language.flag}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={language.name}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: i18n.language === language.code ? 'primary.main' : 'text.primary',
                      fontWeight: i18n.language === language.code ? 600 : 400,
                      fontSize: '0.95rem',
                    },
                  }}
                />
                {i18n.language === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#00d4aa',
                      borderRadius: '50%',
                      marginLeft: '8px',
                    }}
                  />
                )}
              </MenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Menu>
    </Box>
  )
}

export default LanguageSwitcher
