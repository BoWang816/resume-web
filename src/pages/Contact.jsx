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
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import { getContactInfo, getSocialLinks, sendContactForm } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
}

const Contact = () => {
  const [contactData, setContactData] = useState(null)
  const [socialData, setSocialData] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formLoading, setFormLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contact, social] = await Promise.all([
          getContactInfo(),
          getSocialLinks()
        ])
        setContactData(contact)
        setSocialData(social)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const response = await sendContactForm(formData)
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to send message. Please try again.',
        severity: 'error',
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
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

            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href={`mailto:${contactData?.email}`}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontFamily: '"SF Mono", monospace',
                mb: 4,
              }}
            >
              {t('contact.sayHello')}
            </Button>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              {socialData.map((social, index) => {
                const IconComponent = socialIcons[social.icon]
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <IconButton
                      component="a"
                      href={social.url}
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
                      {IconComponent && <IconComponent fontSize="inherit" />}
                    </IconButton>
                  </motion.div>
                )
              })}
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
                        disabled={formLoading}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontFamily: '"SF Mono", monospace',
                          minWidth: '200px',
                        }}
                      >
                        {formLoading ? (
                          <CircularProgress size={24} color="primary" />
                        ) : (
                          t('contact.form.send')
                        )}
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
