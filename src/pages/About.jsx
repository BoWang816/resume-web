import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material'
import { motion } from 'framer-motion'
import { getAboutInfo } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const About = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAboutInfo()
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner message={t('loading.default')} />
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                mb: 6,
                fontSize: { xs: '1.8rem', md: '2rem' },
                fontWeight: 700,
                '&::after': {
                  content: '""',
                  display: 'block',
                  height: '1px',
                  width: { xs: '100px', md: '300px' },
                  backgroundColor: 'text.secondary',
                  ml: 3,
                },
              }}
            >
              {t('about.title')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack spacing={3}>
                {t('about.introduction', { returnObjects: true }).map((paragraph, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'text.secondary',
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  >
                    {t('about.skills')}
                  </Typography>
                  
                  <Grid container spacing={1}>
                    {aboutData?.skills.map((skill, index) => (
                      <Grid item key={skill}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Chip
                            label={skill}
                            variant="outlined"
                            sx={{
                              color: 'primary.main',
                              borderColor: 'primary.main',
                              backgroundColor: 'rgba(100, 255, 218, 0.1)',
                              fontFamily: '"SF Mono", monospace',
                              fontSize: '0.8rem',
                              '&:hover': {
                                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                                transform: 'translateY(-2px)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '300px',
                  mx: 'auto',
                }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '2px solid rgba(0, 212, 170, 0.2)',
                    background: 'linear-gradient(145deg, rgba(26, 31, 58, 0.9), rgba(26, 31, 58, 0.7))',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      borderColor: 'rgba(0, 212, 170, 0.5)',
                      boxShadow: '0 25px 50px rgba(0, 212, 170, 0.15)',
                      '&::after': {
                        opacity: 0,
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                      transition: 'all 0.4s ease',
                      zIndex: 1,
                      opacity: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={aboutData?.image || '/images/profile.jpg'}
                    alt="Profile"
                    sx={{
                      objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(1)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Card>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About
