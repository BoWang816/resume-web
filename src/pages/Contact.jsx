import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import { motion } from 'framer-motion'
import EmailIcon from '@mui/icons-material/Email'
import DownloadIcon from '@mui/icons-material/Download'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'
import { getPersonalInfo } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'


const Contact = () => {
  const [personalData, setPersonalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personal = await getPersonalInfo()
        setPersonalData(personal)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 检查是否填写了必要信息
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSnackbar({
        open: true,
        message: t('contact.fillAllFields'),
        severity: 'warning',
      })
      return
    }
    
    // 检查是否有目标邮箱
    if (!personalData?.email) {
      setSnackbar({
        open: true,
        message: t('contact.noEmailAvailable'),
        severity: 'error',
      })
      return
    }
    
    // 构建邮件内容
    const emailSubject = encodeURIComponent(formData.subject)
    const emailBody = encodeURIComponent(
      `Hi,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    )
    
    // 打开邮箱客户端
    const mailtoUrl = `mailto:${personalData.email}?subject=${emailSubject}&body=${emailBody}`
    window.open(mailtoUrl, '_self')
    
    // 清空表单
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    
    // 显示成功提示
    setSnackbar({
      open: true,
      message: t('contact.emailClientOpened'),
      severity: 'success',
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleDownloadResume = async (e) => {
    e.preventDefault()
    
    // 从环境变量获取下载地址
    const downloadUrl = import.meta.env.VITE_DOWNLOAD_URL || personalData?.resume || '/resume.pdf'
    
    // 调试信息
    console.log('Download URL from env:', import.meta.env.VITE_DOWNLOAD_URL)
    console.log('Final download URL:', downloadUrl)
    
    try {
      // 检查文件是否存在
      const response = await fetch(downloadUrl, { method: 'HEAD' })
      
      if (!response.ok) {
        throw new Error('Resume not found')
      }
      
      // 创建下载链接
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `resume-${personalData?.name?.replace(/\s+/g, '-').toLowerCase() || 'resume'}.pdf`
      // 移除 target="_blank" 避免打开新页面
      
      // 触发下载
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 显示成功消息
      setSnackbar({
        open: true,
        message: t('contact.resumeDownloaded'),
        severity: 'success',
      })
    } catch (error) {
      console.error('Download error:', error)
      
      // 显示错误消息
      setSnackbar({
        open: true,
        message: t('contact.resumeNotAvailable'),
        severity: 'warning',
      })
    }
  }

  if (loading) {
    return <LoadingSpinner message={t('contact.loading')} />
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                fontSize: '1.2rem',
                mb: 2,
                fontFamily: '"SF Mono", monospace',
              }}
            >
              {t('contact.subtitle')}
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 3,
                color: 'text.primary',
              }}
            >
              {t('contact.title')}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'text.secondary',
                mb: 4,
              }}
            >
              {t('contact.description')}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                href={personalData?.email ? `mailto:${personalData.email}` : '#'}
                onClick={!personalData?.email ? (e) => {
                  e.preventDefault()
                  setSnackbar({
                    open: true,
                    message: t('contact.noEmailAvailable'),
                    severity: 'error',
                  })
                } : undefined}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontFamily: '"SF Mono", monospace',
                  minWidth: { xs: '200px', sm: 'auto' },
                }}
              >
                {t('contact.sayHello')}
              </Button>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadResume}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontFamily: '"SF Mono", monospace',
                  minWidth: { xs: '200px', sm: 'auto' },
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 212, 170, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('contact.downloadResume')}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              {/* Email */}
              {personalData?.email && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <IconButton
                    component="a"
                    href={`mailto:${personalData.email}`}
                    sx={{
                      color: 'text.primary',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <EmailIcon fontSize="inherit" />
                  </IconButton>
                </motion.div>
              )}

              {/* GitHub */}
              {personalData?.github && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <IconButton
                    component="a"
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.primary',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <GitHubIcon fontSize="inherit" />
                  </IconButton>
                </motion.div>
              )}

              {/* Website */}
              {personalData?.website && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <IconButton
                    component="a"
                    href={personalData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.primary',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <LanguageIcon fontSize="inherit" />
                  </IconButton>
                </motion.div>
              )}
            </Stack>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              backgroundColor: 'background.paper',
              borderRadius: '5px',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  mb: 4,
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                {t('contact.sendMessage')}
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('contact.form.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'text.secondary',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                          '&.Mui-focused': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('contact.form.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'text.secondary',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                          '&.Mui-focused': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.subject')}
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'text.secondary',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                          '&.Mui-focused': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('contact.form.message')}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'text.secondary',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
                          '&.Mui-focused': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        type="submit"
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontFamily: '"SF Mono", monospace',
                          minWidth: '200px',
                        }}
                      >
                        {t('contact.form.send')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default Contact
